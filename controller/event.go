package controller

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"log"

	"github.com/gorilla/mux"
	"github.com/ryomak/circlebank/model"
	"strconv"
)

type Event struct {
	DB *sql.DB
}

func (e *Event) EventDetailHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	events, err := model.GetCircleEventDetail(e.DB, vars["circle_name"], vars["event_id"])
	if err != nil {
		log.Printf("event err %v", err)
	}
	a, err := json.Marshal(events)
	if err != nil {
		log.Printf("err %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}

func (e *Event) RecentEventHandler(w http.ResponseWriter, r *http.Request){
	defer r.Body.Close()
	q := r.URL.Query()
	page, err := strconv.Atoi(q.Get("page"))
	if err != nil {
		page = 1
	}
	events, err := model.GetEvents(e.DB, page)
	if err != nil {
		log.Printf("adminCircle err %v", err)
		w = SetHeader(w, http.StatusNotFound)
		status := StatusCode{Code: http.StatusNotFound, Message: "not found"}
		res, _ := json.Marshal(status)
		w.Write(res)
	} else {
		res, err := json.Marshal(events)
		if err != nil {
			log.Printf("Marshal %v", err)
		}
		w = SetHeader(w, http.StatusOK)
		w.Write(res)
	}
}