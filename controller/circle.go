package controller

import (
	"net/http"

	"database/sql"
	"encoding/json"

	"log"

	"github.com/gorilla/mux"
	"github.com/ryomak/circlebank/model"
)

type Circle struct {
	DB *sql.DB
}

func (c *Circle) CircleHandler(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	circle, err := model.GetCircleDetail(c.DB, vars["univ"], vars["circle_name"])

	if err != nil {
		log.Printf("getCircleDetail err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
	} else {
		a, err := json.Marshal(circle)
		if err != nil {
			log.Printf("Marshal %v", err)
		}
		w = SetHeader(w, http.StatusOK)
		w.Write(a)
	}

}

func (c *Circle) UnivCircleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circles, err := model.GetUnivCircles(c.DB, vars["univ"])
	if err != nil {
		log.Printf("getCircleDetail err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
	} else {
		a, err := json.Marshal(circles)
		if err != nil {
			log.Printf("Marshal %v", err)
		}
		w = SetHeader(w, http.StatusOK)
		w.Write(a)
	}
}

func (c *Circle) SearchHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	tags, err := model.GetTags(c.DB, vars["univ"])
	if err != nil {
		log.Printf("sarch err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
	} else {
		a, err := json.Marshal(tags)
		if err != nil {
			log.Printf("err %v", err)
		}
		w = SetHeader(w, http.StatusOK)
		w.Write(a)
	}
}

func (c *Circle) TagCirclesHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circles, err := model.GetTagCircles(c.DB, vars["univ"], vars["id"])
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	a, err := json.Marshal(circles)
	if err != nil {
		log.Printf("err %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)

}

func (c *Circle) GetCircleCommentHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circlceComments, err := model.GetCircleComments(c.DB, vars["univ"], vars["circle_name"])
	if err != nil {
		log.Printf("err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	a, err := json.Marshal(circlceComments)
	if err != nil {
		log.Printf("err %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}

func (c *Circle) PostCircleCommentHandler(w http.ResponseWriter, r *http.Request) {
	mail := getUserEmail(r)
	circle_id := r.PostFormValue("circle_id")
	point := r.PostFormValue("point")
	text := r.PostFormValue("text")
	err := model.PostCiecleComments(c.DB, mail, circle_id, point, text)
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

func (c *Circle) DeleteCircleCommentHandler(w http.ResponseWriter, r *http.Request) {
	mail := getUserEmail(r)
	circle_id := r.PostFormValue("circle_id")
	err := model.DeleteCiecleComments(c.DB, mail, circle_id)
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
