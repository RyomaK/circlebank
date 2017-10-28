package model

import (
	"log"

	"database/sql"

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
	}
	return circles
}

func GetTagCircles(db *sql.DB, univ_id, tag_id string) []Circle {
	query := `select circles.id,circles.name,number,introduction,campus,excite,fee
			  from (circles inner join universities on univ_id = universities.id)
			  inner join circles_tags on circles.id = circles_tags.circle_id
			  inner join tags on circles_tags.tag_id = tags.id
			  where universities.url_name and  tags.id = ?`
	rows, _ := db.Query(query, univ_id, tag_id)
	circles, err := ScanCircles(rows)
	if err != nil {
		log.Printf("get circles: %v ", err)
	}
	return circles
}

func GetTags(db *sql.DB, univ string) []Tag {
	query := `select tags.id tags.name,univ_id
			  from (circles inner join universities on univ_id = universities.id)
			  inner join circles_tags on circles.id = circles_tags.circle_id
			  inner join tags on circles_tags.tag_id = tags.id
			  where universities.url_name = ?`
	rows, _ := db.Query(query, univ)
	tags, err := ScanTags(rows)
	if err != nil {
		log.Printf("get circles: %v ", err)
	}
	return tags
}
