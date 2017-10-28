package model

import (
	"fmt"
	"testing"
)

func TestDBConnect(t *testing.T) {
	actual := DBConnect("root:@/circle_bank")
	row := actual.QueryRow(`SELECT * from circles`)
	fmt.Printf("%v\n", actual)
	fmt.Printf("%v", row)
}
