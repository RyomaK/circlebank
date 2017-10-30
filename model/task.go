package model

import (
	"log"

	"database/sql"

	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func GetCircleDetail(db *sql.DB, univ, id string) CircleDetail {
	query := `select circles.id,circles.name,number,introduction,message_fresh,delegetes.name,delegetes.contact,campus,excite,fee,universities.name
			  from (circles left outer join universities on univ_id = universities.id)
			  left outer join delegetes on circles.id = delegetes.circle_id
			  where universities.url_name = ? and circles.id = ?`
	row := db.QueryRow(query, univ, id)
	circle, err := ScanCircleDetail(row)
	if err != nil {
		log.Printf("get circle detail: %v ", err)
		return CircleDetail{}
	}
	return circle
}

func GetUnivCircles(db *sql.DB, univ string) []Circle {
	query := `select circles.id,circles.name,number,introduction,campus,excite,fee
			  from circles
			  left outer join universities on univ_id = universities.id
			  where universities.url_name = ?`
	rows, _ := db.Query(query, univ)
	circles, err := ScanCircles(rows)
	if err != nil {
		log.Printf("get circles: %v ", err)
		return []Circle{}
	}
	return circles
}

func GetTagCircles(db *sql.DB, univ_name, tag_id string) []Circle {
	query := `select circles.id,circles.name,number,introduction,campus,excite,fee
			  from (circles inner join universities on univ_id = universities.id)
			  inner join circles_tags on circles.id = circles_tags.circle_id
			  inner join tags on circles_tags.tag_id = tags.id
			  where universities.url_name = ?  and  tags.id = ?`
	rows, _ := db.Query(query, univ_name, tag_id)
	fmt.Printf("%v", rows)
	circles, err := ScanCircles(rows)
	if err != nil {
		log.Printf("not tag circles: %v ", err)
		return []Circle{}
	}
	return circles
}

func GetTags(db *sql.DB, univ_name string) []Tag {

	query := `select tags.id, tags.name
			  from (circles inner join universities on circles.univ_id = universities.id)
			  inner join circles_tags on circles.id = circles_tags.circle_id
			  inner join tags on circles_tags.tag_id = tags.id
			  where universities.url_name = ?`
	rows, _ := db.Query(query, univ_name)
	tags, err := ScanTags(rows)
	if err != nil {
		log.Printf("get circles: %v ", err)
		return []Tag{}
	}
	return tags
}

func GetCircleEventDetail(db *sql.DB, univ_id, id string) Event {
	query := ``
	row := db.QueryRow(query, univ_id, id)
	event, err := ScanEvent(row)
	if err != nil {
		log.Printf("get event detail: %v ", err)
		return Event{}
	}
	return event
}

func GetCircleEvents(db *sql.DB, circle_name string) []Event {

	query := ``
	rows, _ := db.Query(query, circle_name)
	events, err := ScanEvents(rows)
	if err != nil {
		log.Printf("get events: %v ", err)
		return []Event{}
	}
	return events
}
