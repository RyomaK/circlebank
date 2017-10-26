package controller

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

func CircleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%s Univ %s", vars["univ"], vars["name"])
}

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	query := r.URL.Query()
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%v Univ\n", vars["univ"])
	//tagをスペースで分ける
	for i, v := range split(query["tag"][0]) {
		fmt.Fprintf(w, "tag%d %v\n", i, v)
	}
}

func split(str string) []string {
	return strings.Split(str, " ")
}
