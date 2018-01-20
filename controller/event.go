package controller

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"log"

	"github.com/RyomaK/circlebank/model"
	"github.com/gorilla/mux"
)

type Event struct {
	DB *sql.DB
}

func (e *Event) EventHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	events, err := model.GetCircleEventDetail(e.DB, vars["univ"], vars["circle_name"], vars["event_id"])
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
