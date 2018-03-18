package circlebank

import (
	"net/http"
)

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
}
func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
}
func OK(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("OK"))
}
