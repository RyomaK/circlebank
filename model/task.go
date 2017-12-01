package model

import (
	"log"

	"database/sql"

	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func GetCircleDetail(db *sql.DB, univ, id string) (CircleDetail,error) {
	query := `select circles.id,circles.name,number,introduction,message_fresh,delegetes.name,delegetes.contact,campus,excite,fee,universities.name
			  from (circles left outer join universities on univ_id = universities.id)
			  left outer join delegetes on circles.id = delegetes.circle_id
			  where universities.url_name = ? and circles.id = ?`
	row := db.QueryRow(query, univ, id)
	circle, err := ScanCircleDetail(row)
	if err != nil {
		log.Printf("get circle detail: %v ", err)
		return CircleDetail{},err
	}
	return circle,nil
}

func GetUnivCircles(db *sql.DB, univ string) ([]Circle ,error){
	query := `select circles.id,circles.name,number,introduction,campus,excite,fee
			  from circles
			  left outer join universities on univ_id = universities.id
			  where universities.url_name = ?`
	rows, _ := db.Query(query, univ)
	circles, err := ScanCircles(rows)
	if err != nil {
		log.Printf("get circles: %v ", err)
		return []Circle{},err
	}
	return circles,nil
}

func GetTagCircles(db *sql.DB, univ_name, tag_id string) ([]Circle ,error){
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
		return []Circle{},err
	}
	return circles,nil
}

func GetTags(db *sql.DB, univ_name string) ([]Tag,error) {

	query := `select tags.id, tags.name
			  from (circles inner join universities on circles.univ_id = universities.id)
			  inner join circles_tags on circles.id = circles_tags.circle_id
			  inner join tags on circles_tags.tag_id = tags.id
			  where universities.url_name = ?`
	rows, _ := db.Query(query, univ_name)
	tags, err := ScanTags(rows)
	if err != nil {
		log.Printf("get circles: %v ", err)
		return []Tag{} ,err
	}
	return tags,nil
}

func GetCircleEventDetail(db *sql.DB, univ_id, id string)( Event,error ){
	query := ``
	row := db.QueryRow(query, univ_id, id)
	event, err := ScanEvent(row)
	if err != nil {
		log.Printf("get event detail: %v ", err)
		return Event{},err
	}
	return event,nil
}

func GetCircleEvents(db *sql.DB, circle_name string) ([]Event,error ){

	query := ``
	rows, _ := db.Query(query, circle_name)
	events, err := ScanEvents(rows)
	if err != nil {
		log.Printf("get events: %v ", err)
		return []Event{},err
	}
	return events,nil
}
