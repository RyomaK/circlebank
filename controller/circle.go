package controller

import (
	"net/http"

	"database/sql"
	"encoding/json"

	"log"

	"github.com/RyomaK/circlebank/model"
	"github.com/gorilla/mux"
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
