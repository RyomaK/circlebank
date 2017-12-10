package circlebank

import (
	"net/http"

	"github.com/RyomaK/circlebank/controller"
)

func Login(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	_, err := r.Cookie("auth")
	if err == http.ErrNoCookie {
		// not authenticated
		http.Error(w, "Not Authorized", http.StatusUnauthorized)
	} else if err != nil {
		// some other error
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		next(w, r)
	}

}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	str := "ないよ"
	w.Write([]byte(str))
}
func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
	w = controller.SetHeader(w, 200)
}
