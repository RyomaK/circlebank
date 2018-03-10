package model

import (
	"fmt"
	"testing"
)

func TestGetTagCircles(t *testing.T) {
	actual := GetTagCircles(DBConnect("root:@localhost/circle_bank"), "1")
	fmt.Printf("%v", actual)
}


