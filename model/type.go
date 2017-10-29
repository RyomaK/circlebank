package model

import "time"

type CircleDetail struct {
	ID              uint   `db:"id" json:"id"`
	Name            string `db:"name" json:"name"`
	Number          string `db:"number" json:"number"`
	Introduce       string `db:"introduction" json:"introduction"`
	MessageForFresh string `db:"message_fresh" json:"message_fresh"`
	DelegeteName    string `db:"delegete_name" json:"delegete_name"`
	DelegeteContact string `db:"delegete_contact" json:"delegete_contact"`
	Campus          string `db:"campus" json:"campus"`
	Excite          uint   `db:"excite" json:"excite"`
	Fee             uint   `db:"fee" json:"fee"`
	University      string `db:"university" json:"university"`
}

type Circle struct {
	ID        uint   `db:"id" json:"id"`
	Name      string `db:"name" json:"name"`
	Number    string `db:"number" json:"number"`
	Introduce string `db:"introduction" json:"introduction"`
	Campus    string `db:"campus" json:"campus"`
	Excite    uint   `db:"excite" json:"excite"`
	Fee       uint   `db:"fee" json:"fee"`
}

type Event struct {
	ID         uint      `db:"id" json:"id"`
	Name       string    `db:"name" json:"name"`
	Content    string    `db:"number" json:"number"`
	Agenda     time.Time `db:"introduction" json:"introduction"`
	Detail     string    `db:"message_fresh" json:"message_fresh"`
	Capacity   uint      `db:"excite" json:"excite"`
	Fee        uint      `db:"fee" json:"fee"`
	University string    `db:"university" json:"university"`
}

type Tag struct {
	ID   uint   `db:"id" json:"id"`
	Name string `db:"name" json:"name"`
}

type User struct {
	ID         uint   `db:"id" json:"id"`
	University string `db:"university" json:"university"`
	Name       string `db:"name" json:"name"`
	Mail       string `db:"mail" json:"mail"`
	Password   string `db:"password" json:"password"`
	Sex        string `db:"sex" json:"sex"`
	Department string `db:"department" json:"department"`
	Subject    string `db:"subject" json:"subject"`
}
