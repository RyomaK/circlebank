package controller

import (
	"database/sql"
	"encoding/json"
	"html/template"
	"net/http"

	"github.com/ryomak/circlebank/model"
	"log"
)

type User struct {
	DB *sql.DB
}

// login handler
func (u *User) LoginHandler(w http.ResponseWriter, r *http.Request) {
	mail := template.HTMLEscapeString(r.FormValue("mail"))
	password := template.HTMLEscapeString(r.FormValue("password"))
	if model.IsLogin(u.DB, mail, password) {
		WriteJWT(w, mail)
		w = SetHeader(w, http.StatusOK)
		return
	}
	status := StatusCode{Code: http.StatusNotAcceptable, Message: "error login"}
	a, _ := json.Marshal(status)
	w = SetHeader(w, http.StatusUnauthorized)
	w.Write(a)

}

func (u *User) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:  "Authorization",
		Value: "",
		Path:  "/",
	})
	w = SetHeader(w, http.StatusAccepted)
}

func (u *User) SignUpHandler(w http.ResponseWriter, r *http.Request) {

	b := model.UserExist(u.DB, r.FormValue("mail"))
	if b {
		status := StatusCode{Code: http.StatusConflict, Message: "already mail"}
		a, _ := json.Marshal(status)
		w = SetHeader(w, http.StatusConflict)
		w.Write(a)
	} else {
		person := model.User{}
		person.Name = r.FormValue("name")
		person.Mail = r.FormValue("mail")
		person.Password = r.FormValue("password")
		if err := model.Regist(u.DB, person); err != nil {
			log.Printf("err in signHandler %v", err)
			status := StatusCode{Code: http.StatusNotAcceptable, Message: "NG"}
			a, _ := json.Marshal(status)
			w = SetHeader(w, http.StatusNotAcceptable)
			w.Write(a)
			return
		}
		status := StatusCode{Code: http.StatusCreated, Message: "OK"}
		a, _ := json.Marshal(status)
		WriteJWT(w, person.Mail)
		w = SetHeader(w, http.StatusCreated)
		w.Write(a)
	}

}
