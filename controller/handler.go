package controller

import (
	"log"

	"golang.org/x/crypto/bcrypt"
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
