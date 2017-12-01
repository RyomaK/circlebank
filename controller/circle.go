package controller

import (
	"fmt"
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
	fmt.Println("circlehandler")
	vars := mux.Vars(r)
	//ここにeventの配列も後で追加
	circle, err := model.GetCircleDetail(c.DB, vars["univ"], vars["id"])
	if err != nil {
		log.Printf("getCircleDetail err %v", err)
	}
	a, err := json.Marshal(circle)
	if err != nil {
		log.Printf("Marshal %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}

func (c *Circle) UnivCircleHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("univcirclehandler")
	vars := mux.Vars(r)
	//ここにeventの配列も後で追加
	circles, err := model.GetUnivCircles(c.DB, vars["univ"])
	if err != nil {
		log.Printf("getCircleDetail err %v", err)
	}
	a, err := json.Marshal(circles)
	if err != nil {
		log.Printf("Marshal %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}

func (c *Circle) SearchHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("searchhandler")
	vars := mux.Vars(r)
	tags, err := model.GetTags(c.DB, vars["univ"])
	if err != nil {
		log.Printf("sarch err %v", err)
	}
	a, err := json.Marshal(tags)
	if err != nil {
		log.Printf("err %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}

func (c *Circle) TagCirclesHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	circles, err := model.GetTagCircles(c.DB, vars["univ"], vars["id"])
	if err != nil {
		log.Printf("err %v", err)
	}
	a, err := json.Marshal(circles)
	if err != nil {
		log.Printf("err %v", err)
	}
	w = SetHeader(w, http.StatusOK)
	w.Write(a)
}
