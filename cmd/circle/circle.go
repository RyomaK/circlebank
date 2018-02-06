package main

import (
	"flag"

	"github.com/ryomak/circlebank"
)

var (
	addr     = flag.String("addr", "8080", "addr to bind")
	dbconfig = flag.String("dbconfig", "root:@/circle_bank?parseTime=true", "db connect")
)

func main() {
	flag.Parse()
	b := circlebank.New()
	b.Run(*dbconfig, *addr)
}
