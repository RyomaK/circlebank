package main

import (
	"flag"

	"github.com/RyomaK/circlebank"
)

func main() {
	var (
		addr     = flag.String("addr", "8080", "addr to bind")
		dbconfig = flag.String("dbconfig", "root:@/circle_bank", "db connect")
	)
	b := circlebank.New()
	b.Run(*dbconfig, *addr)
}
