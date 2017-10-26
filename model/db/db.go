package db

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

	return db
}
