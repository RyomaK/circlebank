package main

import (
	"flag"

	"github.com/RyomaK/circlebank"
)

func main() {
	var (
		addr     = flag.String("addr", "8080", "addr to bind")
		dbconfig = flag.String("dbconfig", "root:Kenta71619@/circle_bank", "db connect")
	)
	b := circlebank.New()
	b.Run(*dbconfig, *addr)
}
