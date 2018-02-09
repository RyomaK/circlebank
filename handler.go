package circlebank

import (
	"net/http"
)

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("location", "/")
	w.WriteHeader(http.StatusTemporaryRedirect)
}
func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
}
