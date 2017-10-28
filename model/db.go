package model

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func DBConnect(config string) *sql.DB {
	db, err := sql.Open("mysql", config)
	if err != nil {
		log.Fatalf("cannot open database configuration. exit. %s", err)
	}
	err = db.Ping()
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	return db
}

func DbClose(db *sql.DB) {
	if db != nil {
		db.Close()
		log.Println("close database")
	}
}
