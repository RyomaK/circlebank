package controller

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/RyomaK/circlebank/model"
	"github.com/gorilla/mux"
)

type Admin struct {
	DB *sql.DB
}

func (a *Admin) AdminCircleHandler(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	vars := mux.Vars(r)
	page, err := strconv.Atoi(q.Get("page"))
	if err != nil {
		page = 1
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

func (a *Admin) AdminCircleEventHandler(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	vars := mux.Vars(r)
	page, err := strconv.Atoi(q.Get("page"))
	if err != nil {
		page = 1
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

//json受け取り
func (a *Admin) PostAdminCircleDetailHandler(w http.ResponseWriter, r *http.Request) {
	/*
		vars := mux.Vars(r)
		univ := vars["univ"]
		var circle model.CircleDetail
		err := json.Unmarshal(&circle, r.Body)
		if err != nil {
			log.Printf("post admin circleDeteil err %v\n", err)
			w = SetHeader(w, http.StatusNotFound)
			status := StatusCode{Code: http.StatusBadRequest, Message: "but shape"}
			res, _ := json.Marshal(status)
			w.Write(res)
			return
		}

		err = model.InsertCircle(a.DB, univ, circle)
		if err != nil {
			log.Printf("post admin circleDeteil err %v\n", err)
			w = SetHeader(w, http.StatusNotFound)
			status := StatusCode{Code: http.StatusBadRequest, Message: "cannot regist circle"}
			res, _ := json.Marshal(status)
			w.Write(res)
			return
		}
		w = SetHeader(w, http.StatusOK)
		status := StatusCode{Code: http.StatusOK, Message: "regist circle"}
		res, _ := json.Marshal(status)
		w.Write(res)
		return
	*/

}

func (a *Admin) UpdateAdminCircleDetailHandler(w http.ResponseWriter, r *http.Request) {

}

func (a *Admin) DeleteAdminCircleDetailHandler(w http.ResponseWriter, r *http.Request) {

}

func (a *Admin) PostAdminCircleEventHandler(w http.ResponseWriter, r *http.Request) {

}

func (a *Admin) UpdateAdminCircleEventHandler(w http.ResponseWriter, r *http.Request) {

}

func (a *Admin) DeleteAdminCircleEventHandler(w http.ResponseWriter, r *http.Request) {

}
