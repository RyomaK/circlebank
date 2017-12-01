package controller

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"fmt"

	"log"

	"github.com/RyomaK/circlebank/model"
	"github.com/gorilla/mux"
)

type Event struct {
	DB *sql.DB
}

func (e *Event) EventHandler(w http.ResponseWriter, r *http.Request) {
	//loginしないと見れない
	if IsLogin(r) {
		vars := mux.Vars(r)
		events,err := model.GetCircleEventDetail(e.DB, vars["id"], vars["event"])
		if err != nil {
			fmt.Errorf("err %v", err)
			w.WriteHeader(http.StatusBadRequest)
		}
		a, err := json.Marshal(events)
		if err != nil {
			fmt.Errorf("err %v", err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(a)
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		a, err := json.Marshal(model.Event{})
		if err != nil {
			log.Printf("%v", err)
		}
		w.Write(a)
	}
}
