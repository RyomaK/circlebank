package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"log"

	"github.com/gorilla/mux"
	"github.com/olahol/go-imageupload"
	"github.com/ryomak/circlebank/model"
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

func (u *User) UserUpdateHandler(w http.ResponseWriter, r *http.Request) {
	user, err := model.GetUser(u.DB, getUserEmail(r))
	name := r.FormValue("name")
	mail := r.FormValue("mail")
	pass := r.FormValue("password")
	newPass := r.FormValue("newpassword")
	if err = model.ComparePass(user.User.Password, pass); err == nil {
		if newPass != "" {
			err = model.UpdateProfile(u.DB, user.User.ID, name, mail, newPass)
		} else {
			err = model.UpdateProfile(u.DB, user.User.ID, name, mail, pass)
		}
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

func (u *User) PostEvent(w http.ResponseWriter, r *http.Request) {
	//イベントを追加
	event_id := r.FormValue("event_id")
	mail := getUserEmail(r)
	err := model.PostEvent(u.DB, mail, event_id)
	if err != nil {
		fmt.Println(err)
		status := StatusCode{Code: http.StatusNotAcceptable, Message: "cannnot post events"}
		a, _ := json.Marshal(status)
		w = SetHeader(w, http.StatusNotAcceptable)
		w.Write(a)
		return
	}
	status := StatusCode{Code: http.StatusOK, Message: "regist events"}
	a, _ := json.Marshal(status)
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}

func (u *User) DeleteEvent(w http.ResponseWriter, r *http.Request) {
	//イベントを削除
	event_id := r.FormValue("event_id")
	mail := getUserEmail(r)
	err := model.DeleteEvent(u.DB, mail, event_id)
	if err != nil {
		status := StatusCode{Code: http.StatusNotAcceptable, Message: "cannnot delete events"}
		a, _ := json.Marshal(status)
		w = SetHeader(w, http.StatusNotAcceptable)
		w.Write(a)
		return
	}
	status := StatusCode{Code: http.StatusOK, Message: "delete events"}
	a, _ := json.Marshal(status)
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}

// login handler
func (u *User) LoginHandler(w http.ResponseWriter, r *http.Request) {
	mail := r.FormValue("mail")
	password := r.FormValue("password")
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
		person.University = r.FormValue("university")
		person.Name = r.FormValue("name")
		person.Mail = r.FormValue("mail")
		person.Gender = r.FormValue("sex")
		person.Department = r.FormValue("department")
		person.Subject = r.FormValue("subject")
		person.Password = r.FormValue("password")
		person.Year, _ = strconv.Atoi(r.FormValue("year"))
		person.Image = "img/users/default.png"
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
		image := "img/users/" + strconv.FormatUint(uint64(user.User.ID), 10) + ".png"
		err = model.UpdatePicture(u.DB, user.User.Mail, image)
		if err != nil {
			log.Printf("err %v", err)
			w = SetHeader(w, http.StatusBadRequest)
			status := StatusCode{Code: http.StatusBadRequest, Message: "cannot upload"}
			a, _ := json.Marshal(status)
			w.Write(a)
		} else {
			thumb.Save("public/" + image)
			w = SetHeader(w, http.StatusCreated)
			status := StatusCode{Code: http.StatusCreated, Message: "upload"}
			a, _ := json.Marshal(status)
			w.Write(a)
		}

	}

}

func (u *User) GetLikeCircleHandler(w http.ResponseWriter, r *http.Request) {
	circles, err := model.GetUserLikeCircles(u.DB, getUserEmail(r))
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
	} else {
		a, err := json.Marshal(circles)
		if err != nil {
			log.Printf("err %v", err)
		}
		w = SetHeader(w, http.StatusOK)
		w.Write(a)
	}
}

func (u *User) PostLikeCircleHandler(w http.ResponseWriter, r *http.Request) {
	mail := getUserEmail(r)
	circleID := r.PostFormValue("circle_id")
	fmt.Printf("%v\n", mail)
	err := model.PostUserLikesCircles(u.DB, mail, circleID)
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist like"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "regist like"}
	a, _ := json.Marshal(status)
	w.Write(a)
}

func (u *User) DeleteLikeCircleHandler(w http.ResponseWriter, r *http.Request) {
	mail := getUserEmail(r)
	circle_id := r.PostFormValue("circle_id")
	err := model.DeleteUserLikesCircles(u.DB, mail, circle_id)
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot delete like"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "delete like"}
	a, _ := json.Marshal(status)
	w.Write(a)
}
func (u *User) GetCircleCommentHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circlceComment, err := model.GetCircleComment(u.DB, getUserEmail(r), vars["circle_name"])
	if err != nil {
		w = SetHeader(w, http.StatusNoContent)
		status := StatusCode{Code: http.StatusNoContent, Message: "not found comment"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	a, err := json.Marshal(circlceComment)
	if err != nil {
		log.Printf("err %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}

func (u *User) PostCircleCommentHandler(w http.ResponseWriter, r *http.Request) {
	mail := getUserEmail(r)
	circle_id := r.PostFormValue("circle_id")
	point := r.PostFormValue("point")
	text := r.PostFormValue("text")
	err := model.PostCiecleComments(u.DB, mail, circle_id, point, text)
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot post comment"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	if point == "" || text == "" || circle_id == "" {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot post comment"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "post  comment"}
	a, _ := json.Marshal(status)
	w.Write(a)
}

func (u *User) DeleteCircleCommentHandler(w http.ResponseWriter, r *http.Request) {
	mail := getUserEmail(r)
	circle_id := r.PostFormValue("circle_id")
	err := model.DeleteCiecleComments(u.DB, mail, circle_id)
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot delete comment"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	if circle_id == "" {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot delete comment"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "delete  comment"}
	a, _ := json.Marshal(status)
	w.Write(a)
}

func (u *User) UpdateCircleCommentHandler(w http.ResponseWriter, r *http.Request) {
	mail := getUserEmail(r)
	circle_id := r.PostFormValue("circle_id")
	point := r.PostFormValue("point")
	text := r.PostFormValue("text")
	err := model.UpdateCiecleComments(u.DB, mail, circle_id, point, text)
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot post comment"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	if point == "" || text == "" || circle_id == "" {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "cannot post comment"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	w = SetHeader(w, http.StatusOK)
	status := StatusCode{Code: http.StatusOK, Message: "post  comment"}
	a, _ := json.Marshal(status)
	w.Write(a)
}
