package model

import (
	"database/sql"
	"log"
)

func DBConnect(config string) *sql.DB {
	db, err := sql.Open("mysql", config)
	if err != nil {
		log.Fatalf("cannot open database configuration. exit. %s", err)
	}

	return db
}
