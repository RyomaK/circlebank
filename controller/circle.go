package controller

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func CircleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%s Univ %s", vars["univ"], vars["name"])
}
