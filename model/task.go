package model

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func GetCircleDetail(db *sql.DB, univ, url_name string) (*CircleDetail, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name as university
	from (circles left outer join universities on univ_id = universities.id)
	left outer join delegetes on circles.id = delegetes.circle_id
	where universities.url_name = ? and circles.url_name = ?;`
	row := db.QueryRow(query, univ, url_name)
	circle, err := ScanCircle(row)
	if err != nil {
		return &CircleDetail{}, err
	}
	events, err := GetCircleEvents(db, univ, url_name)
	if err != nil {
		fmt.Print(err)
	}

	tags, err := GetCircleTags(db, univ, url_name)
	if err != nil {
		fmt.Print(err)
	}
	return &CircleDetail{
		Circle: circle,
		Events: events,
		Tags:   tags,
	}, nil

}

func GetUnivCircles(db *sql.DB, univ string) ([]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name as university
	from (circles left outer join universities on univ_id = universities.id)
	left outer join delegetes on circles.id = delegetes.circle_id
	where universities.url_name = ? `
	rows, _ := db.Query(query, univ)
	circles, err := ScanCircles(rows)
	if err != nil {
		return []Circle{}, err
	}
	return circles, nil
}

func GetTagCircles(db *sql.DB, univ_name, tag_id string) ([]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh, delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name
	from (circles inner join universities on univ_id = universities.id)
	inner join circles_tags on circles.id = circles_tags.circle_id
	left outer join delegetes on circles.id = delegetes.circle_id	
	inner join tags on circles_tags.tag_id = tags.id
	where universities.url_name = ?  and  tags.id = ?`
	rows, _ := db.Query(query, univ_name, tag_id)
	circles, err := ScanCircles(rows)
	if err != nil {
		return []Circle{}, err
	}
	return circles, nil
}

func GetTags(db *sql.DB, univ_name string) ([]Tag, error) {
	query := `select tags.id, tags.name
			  from (circles inner join universities on circles.univ_id = universities.id)
			  inner join circles_tags on circles.id = circles_tags.circle_id
			  inner join tags on circles_tags.tag_id = tags.id
			  where universities.url_name = ?`
	rows, _ := db.Query(query, univ_name)
	tags, err := ScanTags(rows)
	if err != nil {
		return []Tag{}, err
	}
	return tags, nil
}

func GetCircleTags(db *sql.DB, univ_name, circle_name string) ([]Tag, error) {
	query := `select tags.id, tags.name
			  from (circles inner join universities on circles.univ_id = universities.id)
			  inner join circles_tags on circles.id = circles_tags.circle_id
			  inner join tags on circles_tags.tag_id = tags.id
			  where universities.url_name = ? and circles.url_name= ?`
	rows, _ := db.Query(query, univ_name, circle_name)
	tags, err := ScanTags(rows)
	if err != nil {
		return []Tag{}, err
	}
	return tags, nil
}

func GetCircleEventDetail(db *sql.DB, univ, circle_name, id string) (Event, error) {
	query := `select events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee
		from (circles left outer join universities on univ_id = universities.id)
		left outer join events on events.circle_id = circles.id
		where universities.url_name = ? and circles.url_name = ? and events.id = ?`
	row := db.QueryRow(query, univ, circle_name, id)
	event, err := ScanEvent(row)
	if err != nil {
		return Event{}, err
	}
	return event, nil
}

func GetCircleEvents(db *sql.DB, univ, circle_name string) ([]Event, error) {
	query := `select events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee
		from (circles left outer join universities on univ_id = universities.id)
		inner join events on events.circle_id = circles.id
		where universities.url_name = ? and circles.url_name = ?;`
	rows, _ := db.Query(query, univ, circle_name)
	events, err := ScanEvents(rows)
	if err != nil {
		return []Event{}, err
	}
	return events, nil
}

func DeleteEvent(db *sql.DB, mail, event_id string) error {
	id := GetUserID(db, mail)q
	query := `delete
	from events_schedules 
	where events_schedules.user_id = ?  and events_schedules.event_id = ?`
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id, event_id)
	if err != nil {
		return err
	}
	return nil
}

func PostEvent(db *sql.DB, mail, event_id string) error {
	id := GetUserID(db, mail)
	query := `insert  into events_schedules
	(user_id,event_id) values(?,?) `
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id, event_id)
	if err != nil {
		return err
	}
	return nil
}
