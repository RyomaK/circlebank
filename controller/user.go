package controller

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	"log"

	"fmt"

	"github.com/RyomaK/circlebank/model"
	"github.com/stretchr/gomniauth"
	"github.com/stretchr/objx"
)

type User struct {
	DB *sql.DB
}

func (u *User) UserHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("userhandler")
	user, err := model.GetUser(u.DB, getUserEmail(r))
	if err != nil {
		log.Printf("err %v", err)
	}
	a, err := json.Marshal(user)
	if err != nil {
		log.Printf("err %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}

func (u *User) UserUpdateHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("user update handler")
	user, err := model.GetUser(u.DB, getUserEmail(r))
	if err != nil {
		log.Printf("err %v", err)
	}
	a, err := json.Marshal(user)
	if err != nil {
		log.Printf("err %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
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
		w = SetHeader(w, http.StatusTemporaryRedirect)

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

		//ここにデータベースにmailがあるかどうかを確認
		//あったら，ログイン
		//なかったらsignup
		if model.UserExist(u.DB, user.Email()) {
			jwtString := CreateJWT(&AuthUser{
				Name:  user.Name(),
				Mail:  user.Email(),
				Image: user.AvatarURL(),
			})
			//cookieに保存
			http.SetCookie(w, &http.Cookie{
				Name:  "Authorization",
				Value: jwtString,
				Path:  "/",
			})
			w.Header().Set("location", "localhost:8080/")
			w = SetHeader(w, http.StatusMovedPermanently)
		} else {
			//signup
			w = SetHeader(w, http.StatusFound)
		}

	default:
		w = SetHeader(w, http.StatusNotFound)
		fmt.Fprintf(w, "Auth action %s not supported", action)
	}
}

func (u *User) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:  "Autorization",
		Value: "",
		Path:  "/",
	})
	w = SetHeader(w, http.StatusAccepted)
}

func (u *User) SignUpHandler(w http.ResponseWriter, r *http.Request) {

	b := model.UserExist(u.DB, r.FormValue("mail"))

	if b {
		w.WriteHeader(http.StatusConflict)
		a, _ := json.Marshal("{signup:already}")
		w = SetHeader(w, http.StatusAlreadyReported)
		w.Write(a)
	} else {
		authUser := JwtToData(r.Header.Get("user"))
		var person model.User
		person.University = r.FormValue("university")
		person.Name = authUser.Name
		person.Mail = authUser.Mail
		person.Image = authUser.Image
		person.Sex = r.FormValue("sex")
		person.Department = r.FormValue("department")
		person.Subject = r.FormValue("subject")
		if err := model.Regist(u.DB, person); err != nil {
			log.Printf("err in signHandler %v", err)
			a, _ := json.Marshal("{signup:NG}")
			w = SetHeader(w, http.StatusNotAcceptable)
			w.Write(a)
		} else {
			w = SetHeader(w, http.StatusCreated)
			a, _ := json.Marshal("{signup:OK}")
			w = SetHeader(w, http.StatusAccepted)
			w.Write(a)
		}

	}

}

func (u *User) SignUpViewHandler(w http.ResponseWriter, r *http.Request) {
	jwtString := r.Header.Get("user")
	a, _ := json.Marshal(JwtToData(jwtString))
	w.Write(a)
}
