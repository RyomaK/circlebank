package controller

import (
	"database/sql"
	"net/http"

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
		events := model.GetCircleEventDetail(e.DB, vars["id"], vars["event"])
	} else {

	}
}
