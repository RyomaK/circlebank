package controller

import (
	"database/sql"
	"encoding/json"
	"net/http"


	"github.com/RyomaK/circlebank/model"
	"github.com/gorilla/mux"
	"log"
)

type Event struct {
	DB *sql.DB
}

func (e *Event) EventHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	//event_idはそのサークルの
	events, err := model.GetCircleEventDetail(e.DB, vars["univ"],vars["id"], vars["event_id"])
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
