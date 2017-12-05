package controller

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"log"

	"fmt"

	"github.com/RyomaK/circlebank/model"
	"github.com/gorilla/mux"
	"github.com/gorilla/securecookie"
	"github.com/stretchr/gomniauth"
	"github.com/stretchr/objx"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	DB *sql.DB
}

func (u *User) UserHandler(w http.ResponseWriter, r *http.Request) {
	if IsLogin(r) {
		fmt.Println("userhandler")
		user, err := model.GetUser(u.DB, getUserMail(r))
		if err != nil {
			log.Printf("err %v", err)
		}
		a, err := json.Marshal(user)
		if err != nil {
			log.Printf("err %v", err)
		}
		w = SetHeader(w, http.StatusOK)
		w.Write(a)
	} else {

		a, err := json.Marshal("{login:}")
		if err != nil {
			log.Printf("err %v", err)
		}
		w = SetHeader(w, http.StatusUnauthorized)
		w.Write(a)
	}

}

func (u *User) login(mail, pass string) bool {
	if (mail == "") && (pass == "") {
		return false
	}
	hash := model.GetUserPass(u.DB, mail)
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(pass))
	if err != nil {
		return false
	}
	return true
}

// login handler
func (u *User) LoginHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	action := vars["action"]
	provider_name := vars["provider"]
	switch action {
	case "login":
		provider, err := gomniauth.Provider(provider_name)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error when trying to get provider %s: %s", provider, err), http.StatusBadRequest)
			return
		}

		loginURL, err := provider.GetBeginAuthURL(nil, nil)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error when trying to GetBeginAuthURL for %s: %s", provider, err), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Location", loginURL)
		w.WriteHeader(http.StatusTemporaryRedirect)

	case "callback":
		provider, err := gomniauth.Provider(provider_name)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error when trying to get provider %s: %s", provider, err), http.StatusBadRequest)
			return
		}

		// get the credentials
		creds, err := provider.CompleteAuth(objx.MustFromURLQuery(r.URL.RawQuery))
		if err != nil {
			http.Error(w, fmt.Sprintf("Error when trying to complete auth for %s: %s", provider, err), http.StatusInternalServerError)
			return
		}

		// get the user
		user, err := provider.GetUser(creds)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error when trying to get user from %s: %s", provider, err), http.StatusInternalServerError)
			return
		}

		// save some data
		authCookieValue := objx.New(map[string]interface{}{
			"name": user.Name(),
		}).MustBase64()
		http.SetCookie(w, &http.Cookie{
			Name:  "auth",
			Value: authCookieValue,
			Path:  "/"})
		w.Header().Set("Location", "/api/doshisha/circle/1")
		w.WriteHeader(http.StatusTemporaryRedirect)

	default:
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "Auth action %s not supported", action)
	}
}

func clearSession(response http.ResponseWriter) {
	cookie := &http.Cookie{
		Name:   "session",
		Value:  "",
		Path:   "/api",
		MaxAge: -1,
	}
	http.SetCookie(response, cookie)
}

// logout handler
func (u *User) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	clearSession(w)
	http.Redirect(w, r, "/api/user", 302)
}

func (u *User) SignUpHandler(w http.ResponseWriter, r *http.Request) {

	b := model.UserExist(u.DB, r.FormValue("mail"))

	if b {
		w.WriteHeader(http.StatusConflict)
		a, _ := json.Marshal("{signup:NG}")
		w.Write(a)
	} else {
		var person model.User
		person.University = r.FormValue("university")
		person.Name = r.FormValue("name")
		person.Mail = r.FormValue("mail")
		person.Password = PassToHash(r.FormValue("password"))
		person.Sex = r.FormValue("sex")
		person.Department = r.FormValue("department")
		person.Subject = r.FormValue("subject")
		if err := model.Regist(u.DB, person); err != nil {
			log.Printf("err in signHandler %v", err)
			a, _ := json.Marshal("{signup:NG}")
			w.Write(a)
		} else {
			http.Redirect(w, r, "/api/user", http.StatusNotAcceptable)
			setSession(person.Mail, w)
			w = SetHeader(w, http.StatusCreated)
			a, _ := json.Marshal("{signup:OK}")
			w.Write(a)
		}

	}

}

var cookieHandler = securecookie.New(
	securecookie.GenerateRandomKey(64),
	securecookie.GenerateRandomKey(32))

func getUserMail(r *http.Request) (userName string) {
	if cookie, err := r.Cookie("session"); err == nil {
		cookieValue := make(map[string]string)
		if err = cookieHandler.Decode("session", cookie.Value, &cookieValue); err == nil {
			userName = cookieValue["mail"]
		}
	}
	return userName
}

func setSession(mail string, w http.ResponseWriter) {
	value := map[string]string{
		"mail": mail,
	}
	if encoded, err := cookieHandler.Encode("session", value); err == nil {
		cookie := &http.Cookie{
			Name:  "session",
			Value: encoded,
			Path:  "/api",
		}
		http.SetCookie(w, cookie)
	}
}

func IsLogin(r *http.Request) bool {
	if getUserMail(r) == "" {
		return false
	}
	return true
}
