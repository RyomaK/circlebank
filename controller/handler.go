package controller

import (
	"log"

	"golang.org/x/crypto/bcrypt"
	"net/http"
)

func PassToHash(pass string) string {
	/*
		bcrypt.MinCost = 4
		bcrypt.MaxCost = 31
		bcrypt.DefaultCost = 10
	*/

	hash, err := bcrypt.GenerateFromPassword([]byte(pass), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("hash err %v", err)
		return ""
	}
	return string(hash)
}

func SetHeader(w http.ResponseWriter,stats int)http.ResponseWriter{
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	return w
}