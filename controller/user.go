package controller

import (
	"database/sql"
	"encoding/json"
	"io"
	"net/http"

	"log"

	"fmt"

	"github.com/RyomaK/circlebank/model"
	"github.com/gorilla/securecookie"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	DB *sql.DB
}

func (u *User) UserHandler(w http.ResponseWriter, r *http.Request) {
	if isLogin(r) {
		fmt.Println("userhandler")
		user := model.GetUser(u.DB, getUserMail(r))
		a, err := json.Marshal(user)
		if err != nil {
			fmt.Errorf("err %v", err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(a)
	} else {

		a, err := json.Marshal("{login:}")
		if err != nil {
			fmt.Errorf("err %v", err)
		}
		w.Header().Set("Content-Type", "application/json")
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
	mail := r.FormValue("mail")
	pass := r.FormValue("password")
	redirectTarget := "/api/user"
	login_json := "{login:" + mail + "}"
	if u.login(mail, pass) {
		setSession(mail, w)
		a, err := json.Marshal(login_json)
		if err != nil {
			fmt.Errorf("err %v", err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(a)
	} else {
		a, err := json.Marshal(login_json)
		if err != nil {
			fmt.Errorf("err %v", err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(a)
	}
	http.Redirect(w, r, redirectTarget, 200)
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
		w.WriteHeader(409)
		io.WriteString(w, "given email address is already used.")
	} else {
		var person model.User
		person.University = r.FormValue("university")
		person.Name = r.FormValue("name")
		person.Mail = r.FormValue("mail")
		person.Password = PassToHash(r.FormValue("password"))
		person.Sex = r.FormValue("sex")
		person.Department = r.FormValue("department")
		person.Subject = r.FormValue("subject")
		fmt.Print(r.FormValue("name"))
		if err := model.Regist(u.DB, person); err != nil {
			log.Printf("err in signHandler %v", err)
			http.Redirect(w, r, "/api/user", 400)
			setSession(person.Mail, w)
		} else {
			http.Redirect(w, r, "/api/user", 201)
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

func isLogin(r *http.Request) bool {
	if getUserMail(r) == "" {
		return false
	}
	return true
}
