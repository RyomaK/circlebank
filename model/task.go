package model

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func GetCircleDetail(db *sql.DB, circle_url_name string) (*CircleDetail, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee
	from circles
	left outer join delegetes on circles.id = delegetes.circle_id
	where  circles.url_name = ?;`
	row := db.QueryRow(query, circle_url_name)
	circle, err := ScanCircle(row)
	if err != nil {
		return &CircleDetail{}, err
	}
	events, err := GetCircleEvents(db, circle_url_name)
	if err != nil {
		fmt.Print(err)
	}

	tags, err := GetCircleTags(db, circle_url_name)
	if err != nil {
		fmt.Print(err)
	}
	return &CircleDetail{
		Circle: *circle,
		Events: *events,
		Tags:   *tags,
	}, nil

}

func GetUnivCircles(db *sql.DB) (*[]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee
	from circles 
	left outer join delegetes on circles.id = delegetes.circle_id`
	rows, _ := db.Query(query)
	circles, err := ScanCircles(rows)
	if err != nil {
		return &[]Circle{}, err
	}
	return circles, nil
}

func GetTagCircles(db *sql.DB, tag_id string) (*[]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh, delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee
	from circles 
	inner join circles_tags on circles.id = circles_tags.circle_id
	left outer join delegetes on circles.id = delegetes.circle_id	
	inner join tags on circles_tags.tag_id = tags.id
	where  tags.id = ?`
	rows, _ := db.Query(query, tag_id)
	circles, err := ScanCircles(rows)
	if err != nil {
		return &[]Circle{}, err
	}
	return circles, nil
}

func GetTags(db *sql.DB, title ...string) (*[]ClassedTag, error) {
	tags := []ClassedTag{}
	for _, v := range title {
		fmt.Printf("%s\n", v)
		query := `select distinct tags.id, tags.name
		from circles 
		inner join circles_tags on circles.id = circles_tags.circle_id
		inner join tags on circles_tags.tag_id = tags.id
		where  tags.class_name = ?`
		rows, _ := db.Query(query, v)
		tag, err := ScanTags(rows)
		classedTag := ClassedTag{
			Title: v,
			Tags:  *tag,
		}
		if err != nil {
			return &tags, err
		}
		tags = append(tags, classedTag)
	}
	return &tags, nil
}

func GetCircleTags(db *sql.DB, circle_name string) (*[]Tag, error) {
	query := `select tags.id, tags.name
			  from circles 
			  inner join circles_tags on circles.id = circles_tags.circle_id
			  inner join tags on circles_tags.tag_id = tags.id
			  where circles.url_name= ?`
	rows, _ := db.Query(query, circle_name)
	tags, err := ScanTags(rows)
	if err != nil {
		return &[]Tag{}, err
	}
	return tags, err
}

func GetCircleEventDetail(db *sql.DB, circle_name, id string) (*Event, error) {
	query := `select events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee
		from circles
		inner join events on events.circle_id = circles.id
		where circles.url_name = ? and events.id = ?`
	row := db.QueryRow(query ,circle_name, id)
	event, err := ScanEvent(row)
	if err != nil {
		return &Event{}, err
	}
	return event, nil
}

func GetCircleEvents(db *sql.DB, circle_name string) (*[]Event, error) {
	query := `select events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee
		from circles
		inner join events on events.circle_id = circles.id
		where circles.url_name = ?;`
	rows, _ := db.Query(query,circle_name)
	events, err := ScanEvents(rows)
	if err != nil {
		return &[]Event{}, err
	}
	return events, nil
}

