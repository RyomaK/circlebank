package circlebank

import (
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
)

type AuthUser struct {
	Name   string `json:"name"`
	Mail   string `json:"mail"`
	Avatar string `json:"avatar"`
	jwt.StandardClaims
}

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
