package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"log"

	"github.com/RyomaK/circlebank/model"
)

type User struct {
	DB *sql.DB
}

func (u *User) UserHandler(w http.ResponseWriter, r *http.Request) {
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

/*
pass 二回
新しいやつ
*/

func (u *User) UserUpdateHandler(w http.ResponseWriter, r *http.Request) {
	user, err := model.GetUser(u.DB, getUserEmail(r))
	name := r.FormValue("name")
	mail := r.FormValue("mail")
	pass := r.FormValue("password")
	newPass := r.FormValue("newpassword")
	if err = model.ComparePass(user.Password, pass); err == nil {
		err = model.UpdateProfile(u.DB, user.ID, name, mail, newPass)
		if err != nil {
			fmt.Printf("update err : %v\n", err)
			a, _ := json.Marshal("{update: NG}")
			w = SetHeader(w, http.StatusBadRequest)
			w.Write(a)
		} else {
			WriteJWT(w, mail)
			a, _ := json.Marshal("{update: ok}")
			w = SetHeader(w, http.StatusNoContent)
			w.Write(a)
		}
	} else {
		fmt.Printf("err: %v\n ", err)
		a, _ := json.Marshal("{password: not match}")
		w = SetHeader(w, http.StatusNotAcceptable)
		w.Write(a)
	}
}

// login handler
func (u *User) LoginHandler(w http.ResponseWriter, r *http.Request) {
	email := r.FormValue("Email")
	password := r.FormValue("password")
	if model.IsLogin(u.DB, email, password) {
		WriteJWT(w, email)
		w.Header().Set("location", "/")
		w = SetHeader(w, http.StatusMovedPermanently)
	} else {
		//signup
		w = SetHeader(w, http.StatusFound)
	}

}

func (u *User) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:  "Authorization",
		Value: "",
		Path:  "/",
	})
	w.Header().Set("Location", "/")
	w = SetHeader(w, http.StatusTemporaryRedirect)
}

func (u *User) SignUpHandler(w http.ResponseWriter, r *http.Request) {

	b := model.UserExist(u.DB, r.FormValue("mail"))

	if b {
		a, _ := json.Marshal("{signup:already}")
		w = SetHeader(w, http.StatusConflict)
		w.Write(a)
	} else {
		//authUser := JwtToData(r.Header.Get("user"))
		person := model.User{}
		person.University = r.FormValue("university")
		person.Name = r.FormValue("name")
		person.Mail = r.FormValue("mail")
		person.Sex = r.FormValue("sex")
		person.Department = r.FormValue("department")
		person.Subject = r.FormValue("subject")
		person.Password = r.FormValue("password")

		if err := model.Regist(u.DB, person); err != nil {
			log.Printf("err in signHandler %v", err)
			a, _ := json.Marshal("{signup:NG}")
			w = SetHeader(w, http.StatusNotAcceptable)
			w.Write(a)
		} else {
			WriteJWT(w, person.Mail)
			a, _ := json.Marshal("{signup:OK}")
			w = SetHeader(w, http.StatusCreated)
			w.Write(a)
		}

	}

}
