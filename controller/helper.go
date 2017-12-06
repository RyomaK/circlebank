package controller

import (
	"encoding/base64"
	"fmt"
	"net/http"
	"strings"

	"github.com/stretchr/objx"
)

type signup struct {
	Name  string `json:"name"`
	Mail  string `json:"mail"`
	Image string `json:"image"`
}

func SetHeader(w http.ResponseWriter, stats int) http.ResponseWriter {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	return w
}

func GetUserData(cookie string) (string, string, string) {
	decode, err := base64.StdEncoding.DecodeString(cookie)
	if err != nil {
		fmt.Errorf("err Encode %v ", err)
	}
	data := strings.Split(string(decode), "\"")
	//avatar,email,name
	return data[3], data[7], data[11]

}

func getUserEmail(r *http.Request) string {
	cookie, err := r.Cookie("data")
	if err != nil {
		fmt.Errorf("err get user emai %v", err)
	}
	_, email, _ := GetUserData(cookie.Value)
	return email
}

func clearAuth(response http.ResponseWriter) {
	cookie := &http.Cookie{
		Name:   "auth",
		Value:  "",
		Path:   "/",
		MaxAge: -1,
	}
	http.SetCookie(response, cookie)
}

func setAuth(w http.ResponseWriter) {
	authCookieValue := objx.New(map[string]interface{}{
		"login": "ok",
	}).MustBase64()
	http.SetCookie(w, &http.Cookie{
		Name:  "auth",
		Value: authCookieValue,
		Path:  "/"})
}
