package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"log"

	"github.com/RyomaK/circlebank/model"
	"github.com/olahol/go-imageupload"
)

type User struct {
	DB *sql.DB
}

func (u *User) UserHandler(w http.ResponseWriter, r *http.Request) {
	user, err := model.GetUser(u.DB, getUserEmail(r))
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
	} else {
		a, err := json.Marshal(user)
		if err != nil {
			log.Printf("err %v", err)
		}
		w = SetHeader(w, http.StatusOK)
		w.Write(a)
	}
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
	mail := r.FormValue("mail")
	password := r.FormValue("password")
	if model.IsLogin(u.DB, mail, password) {
		WriteJWT(w, mail)
		w.Header().Set("location", "/")
		w = SetHeader(w, http.StatusMovedPermanently)
	} else {
		status := StatusCode{Code: http.StatusNotAcceptable, Message: "error login"}
		a, _ := json.Marshal(status)
		w = SetHeader(w, http.StatusNotFound)
		w.Write(a)
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
		status := StatusCode{Code: http.StatusConflict, Message: "already mail"}
		a, _ := json.Marshal(status)
		w = SetHeader(w, http.StatusConflict)
		w.Write(a)
	} else {
		person := model.User{}
		person.University = r.FormValue("university")
		person.Name = r.FormValue("name")
		person.Mail = r.FormValue("mail")
		person.Sex = r.FormValue("sex")
		person.Department = r.FormValue("department")
		person.Subject = r.FormValue("subject")
		person.Password = r.FormValue("password")
		person.Year, _ = strconv.Atoi(r.FormValue("year"))
		if err := model.Regist(u.DB, person); err != nil {
			log.Printf("err in signHandler %v", err)
			status := StatusCode{Code: http.StatusNotAcceptable, Message: "NG"}
			a, _ := json.Marshal(status)
			w = SetHeader(w, http.StatusNotAcceptable)
			w.Write(a)
		} else {
			WriteJWT(w, person.Mail)
			status := StatusCode{Code: http.StatusCreated, Message: "OK"}
			a, _ := json.Marshal(status)
			w = SetHeader(w, http.StatusCreated)
			w.Write(a)
		}

	}

}

func (u *User) UploadPicture(w http.ResponseWriter, r *http.Request) {
	img, err := imageupload.Process(r, "image")
	if err != nil {
		log.Printf("upload1:%v\n", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not file"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	thumb, err := imageupload.ThumbnailPNG(img, 300, 300)
	if err != nil {
		log.Printf("upload :%v\n", err)
		return
	}

	user, err := model.GetUser(u.DB, getUserEmail(r))
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
	} else {
		image := "public/img/users/" + strconv.FormatUint(uint64(user.ID), 10) + ".png"
		err = model.UpdatePicture(u.DB, user.Mail, image)
		if err != nil {
			log.Printf("err %v", err)
			w = SetHeader(w, http.StatusBadRequest)
			status := StatusCode{Code: http.StatusBadRequest, Message: "cannot upload"}
			a, _ := json.Marshal(status)
			w.Write(a)
		} else {
			thumb.Save(image)
			w = SetHeader(w, http.StatusCreated)
			status := StatusCode{Code: http.StatusCreated, Message: "upload"}
			a, _ := json.Marshal(status)
			w.Write(a)
		}

	}

}
