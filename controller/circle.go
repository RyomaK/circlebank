package controller

import (
	"fmt"
	"net/http"

	"database/sql"
	"encoding/json"

	"github.com/RyomaK/circlebank/model"
	"github.com/gorilla/mux"
)

type Circle struct {
	DB *sql.DB
}

func (c *Circle) CircleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	circle := model.GetCircleDetail(c.DB, vars["univ"], vars["id"])
	a, err := json.Marshal(circle)
	if err != nil {
		fmt.Errorf("err %v", err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(a)
}

func (c *Circle) SearchHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	tags := model.GetTags(c.DB, vars["univ"])
	a, err := json.Marshal(tags)
	if err != nil {
		fmt.Errorf("err %v", err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(a)
}

func (c *Circle) TagCirclesHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	circles := model.GetTagCircles(c.DB, vars["univ"], vars["id"])
	a, err := json.Marshal(circles)
	if err != nil {
		fmt.Errorf("err %v", err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(a)
}
