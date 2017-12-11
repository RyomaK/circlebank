package main

import (
	"flag"
	"os"

	"github.com/RyomaK/circlebank"
)

func main() {
	dbuser := os.Args
	var (
		addr     = flag.String("addr", "8080", "addr to bind")
		dbconfig = flag.String("dbconfig", dbuser[1], "db connect")
	)
	b := circlebank.New()
	b.Run(*dbconfig, *addr)
}
