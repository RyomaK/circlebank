package model

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func GetCircleDetail(db *sql.DB, circleURLName string) (*CircleDetail, error) {
	query := `select circles.id,circles.name,circles.url_name,circles.number,circles.image,circles.bill_image,introduction, delegates.name as delegate_name ,delegates.contact as delegate_contact,campus,circles.entrance_fee,circles.annual_fee,circles.activity_of_week,
	circles.activity_time,circles.admission_deadline,circles.box_number,circles.booth_number
	from circles
	left outer join delegates on circles.id = delegates.circle_id
	where  circles.url_name = ?;`
	row := db.QueryRow(query, circleURLName)
	circle, err := ScanCircle(row)
	if err != nil {
		return &CircleDetail{}, err
	}
	events, err := GetCircleEvents(db, circleURLName)
	if err != nil {
		fmt.Print(err)
	}
	sns, err := GetSNS(db, circleURLName)
	if err != nil {
		fmt.Print(err)
	}
	tags, err := GetCircleTags(db, circleURLName)
	if err != nil {
		fmt.Print(err)
	}
	return &CircleDetail{
		Circle:                *circle,
		SocialNetworkingSites: *sns,
		Events:                *events,
		Tags:                  *tags,
	}, nil

}

func GetSNS(db *sql.DB, circleURLName string) (*[]SNS, error) {
	query := `select  circle_sns.circle_id,circle_sns.name
			  from circles 
			  inner join circle_sns on circle_sns.circle_id = circles.id 
			  where circles.url_name = ?`
	rows, _ := db.Query(query, circleURLName)
	sns, err := ScanSNS(rows)
	if err != nil {
		return &[]SNS{}, err
	}
	return sns, nil
}

func GetUnivCircles(db *sql.DB) (*[]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,circles.number,circles.image,circles.bill_image,introduction, delegates.name as delegate_name ,delegates.contact as delegate_contact,campus,circles.entrance_fee,circles.annual_fee,circles.activity_of_week,
	circles.activity_time,circles.admission_deadline,circles.box_number,circles.booth_number
	from circles 
	left outer join delegates on circles.id = delegates.circle_id`
	rows, _ := db.Query(query)
	circles, err := ScanCircles(rows)
	if err != nil {
		return &[]Circle{}, err
	}
	return circles, nil
}

func GetTagCircles(db *sql.DB, tag_id string) (*[]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,circles.number,circles.image,circles.bill_image,introduction, delegates.name as delegate_name ,delegates.contact as delegate_contact,campus,circles.entrance_fee,circles.annual_fee,circles.activity_of_week,
	circles.activity_time,circles.admission_deadline,circles.box_number,circles.booth_number
	from circles 
	inner join circles_tags on circles.id = circles_tags.circle_id
	left outer join delegates on circles.id = delegates.circle_id	
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
	var tags []ClassedTag
	for _, v := range title {
		fmt.Printf("%s\n", v)
		query := `select distinct tags.id, tags.name ,tags.class_name
		from tags 
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
	query := `select tags.id, tags.name,tags.class_name
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
	row := db.QueryRow(query, circle_name, id)
	if row == nil {
		return nil, nil
	}
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
	rows, _ := db.Query(query, circle_name)
	events, err := ScanEvents(rows)
	if err != nil {
		return &[]Event{}, err
	}
	return events, nil
}

func SearchCircles(db *sql.DB, key string, page int) (*[]Circle, error) {
	num := 100
	query := `select circles.id,circles.name,circles.url_name,circles.number,circles.image,circles.bill_image,introduction, delegates.name as delegate_name ,delegates.contact as delegate_contact,campus,circles.entrance_fee,circles.annual_fee,circles.activity_of_week,
	circles.activity_time,circles.admission_deadline,circles.box_number,circles.booth_number from circles left outer join delegates on circles.id = delegates.circle_id where circles.name like concat('%' ,?, '%')  order by url_name asc limit ?,?`
	pageMin := num * (page - 1)
	pageMax := num + pageMin
	rows, err := db.Query(query, key, pageMin, pageMax)

	fmt.Print(key)
	if rows == nil {
		return nil, nil
	}
	circles, err := ScanCircles(rows)
	if err != nil {
		return nil, err
	}
	return circles, nil
}
