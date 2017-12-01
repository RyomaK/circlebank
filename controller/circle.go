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
	fmt.Println("circlehandler")
	vars := mux.Vars(r)
	//ここにeventの配列も後で追加
	circle,err := model.GetCircleDetail(c.DB, vars["univ"], vars["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Errorf("getCircleDetail err %v", err)
	}
	a, err := json.Marshal(circle)
	if err != nil {
		fmt.Errorf("Marshal %v", err)
		w.WriteHeader(http.StatusBadRequest)
	}else{
		w.WriteHeader(http.StatusOK)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(a)
}

func (c *Circle) SearchHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("searchhandler")
	vars := mux.Vars(r)
	tags,err := model.GetTags(c.DB, vars["univ"])
	if err != nil {
		fmt.Errorf("err %v", err)
		w.WriteHeader(http.StatusNotFound)
	}
	a, err := json.Marshal(tags)
	if err != nil {
		fmt.Errorf("err %v", err)
		w.WriteHeader(http.StatusBadRequest)
	} else {
		w.WriteHeader(http.StatusOK)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(a)
}

func (c *Circle) TagCirclesHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circles ,err:= model.GetTagCircles(c.DB, vars["univ"], vars["id"])
	if err != nil {
		fmt.Errorf("err %v", err)
		w.WriteHeader(http.StatusBadRequest)
	}
	a, err := json.Marshal(circles)
	if err != nil {
		fmt.Errorf("err %v", err)
		w.WriteHeader(http.StatusBadRequest)
	}else{
		w.WriteHeader(http.StatusOK)
	}
	w.Header().Set("Content-Type", "application/json")

	w.Write(a)
}
