package controller

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/ryomak/circlebank/model"
)

type Admin struct {
	DB *sql.DB
}

func (a *Admin) AdminCircleHandler(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	vars := mux.Vars(r)
	page, err := strconv.Atoi(q.Get("page"))
	if err != nil {
		log.Printf("adminCircleDetail err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "query is not number"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	circles, err := model.GetCircles(a.DB, vars["univ"], page)

	if err != nil {
		log.Printf("adminCircle err %v", err)
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

func (a *Admin) AdminEventHandler(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	vars := mux.Vars(r)
	page, err := strconv.Atoi(q.Get("page"))
	if err != nil {
		log.Printf("adminCircleDetail err %v", err)
		w = SetHeader(w, http.StatusBadRequest)
		status := StatusCode{Code: http.StatusBadRequest, Message: "query is not number"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	events, err := model.GetEvents(a.DB, vars["univ"], page)
	if err != nil {
		log.Printf("adminCircle err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
	} else {
		a, err := json.Marshal(events)
		if err != nil {
			log.Printf("Marshal %v", err)
		}
		w = SetHeader(w, http.StatusOK)
		w.Write(a)
	}
}

func (a *Admin) AdminCircleDetailHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circle, err := model.GetCircleDetail(a.DB, vars["univ"], vars["circle_name"])
	if err != nil {
		log.Printf("getCircleDetail err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		a, _ := json.Marshal(status)
		w.Write(a)
		return
	}
	res, err := json.Marshal(circle)
	if err != nil {
		log.Printf("Marshal %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(res)

}
