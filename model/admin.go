package model

import (
	"database/sql"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func GetCircles(db *sql.DB, page int) (*[]Circle, error) {
	num := 100
	query := `select circles.id,circles.name,circles.url_name,circles.number,circles.image,circles.bill_image,introduction, delegates.name as delegate_name ,delegates.contact as delegate_contact,campus,circles.entrance_fee,circles.annual_fee,circles.activity_of_week,
	circles.activity_time,circles.admission_deadline,circles.box_number,circles.booth_number
	from circles
	left outer join delegates on circles.id = delegates.circle_id
	order by circles.id DESC 
	limit ?,?`
	pageMin := num * (page - 1)
	pageMax := num + pageMin
	row, _ := db.Query(query, pageMin, pageMax)
	circles, err := ScanCircles(row)
	if err != nil {
		return &[]Circle{}, err
	}
	return circles, nil
}

func GetEvents(db *sql.DB, page int, date time.Time) (*[]AdminCircleEvents, error) {
	num := 100 //所得件数
	pageMin := num * (page - 1)
	pageMax := num + pageMin
	var events *[]AdminCircleEvents
	if date.IsZero() {
		query := `select events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee,circles.id as circle_id ,circles.name as circle_name,circles.url_name as url_circle_name
			from circles 
			inner join events on events.circle_id = circles.id
			order by events.agenda DESC 
			limit  ?,?`
		rows, err := db.Query(query, pageMin, pageMax)
		if err != nil {
			return &[]AdminCircleEvents{}, err
		}
		if rows == nil {
			return &[]AdminCircleEvents{}, nil
		}
		events, err = ScanAdminCircleEvents(rows)
		if err != nil {
			return &[]AdminCircleEvents{}, err
		}
	} else {
		query := `select events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee,circles.id as circle_id ,circles.name as circle_name,circles.url_name as url_circle_name
			from circles 
			inner join events on events.circle_id = circles.id
			where events.agenda = ?
			limit  ?,?`
		rows, err := db.Query(query, date, pageMin, pageMax)
		if err != nil {
			return &[]AdminCircleEvents{}, err
		}
		if rows == nil {
			return &[]AdminCircleEvents{}, nil
		}
		events, err = ScanAdminCircleEvents(rows)
		if err != nil {
			return &[]AdminCircleEvents{}, err
		}
	}

	return events, nil
}

func InsertCircle(db *sql.DB, circle *Circle) error {
	query := `insert into circles (name,url_name,number,introduction,campus,entrance_fee,annual_fee,activity_of_week,activity_time,admission_deadline,box_number,booth_number)
 			  values (?,?,?,?,?,?,?,?,?,?,?,?)`
	result, err := db.Exec(query, circle.Name, circle.URLName, circle.Number, circle.Introduction, circle.Campus, circle.EntranceFee, circle.AnnualFee, circle.ActivityOfWeek, circle.ActivityTime, circle.AdmissionDeadline, circle.BoxNumber, circle.BoothNumber)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	query = `insert into delegates (circle_id,name,contact) values(?,?,?)`
	_, err = db.Exec(query, id, circle.DelegateName, circle.DelegateContact)
	if err != nil {
		return err
	}
	return nil
}

func InsertSNS(db *sql.DB, circleID string, sns *[]SNS) error {
	for _, v := range *sns {
		query := `insert into circle_sns (circle_id,name) values(?,?)`
		_, err := db.Exec(query, circleID, v.Name)
		if err != nil {
			return err
		}
	}
	return nil
}

func InsertEvents(db *sql.DB, circle_id int, events *[]Event) error {
	for _, v := range *events {
		query := `insert into events (circle_id,name,agenda,place,detail,capacity,fee) values (?,?,?,?,?,?,?)`
		_, err := db.Exec(query, circle_id, v.Name, v.Agenda, v.Place, v.Detail, v.Capacity, v.Fee)
		if err != nil {
			return err
		}
	}
	return nil
}

func InsertCircleTags(db *sql.DB, circle_id int, tags *[]Tag) error {
	for _, v := range *tags {
		query := `insert into circles_tags (circle_id,tag_id) 
		select ?,? from dual
		where not exists (select * from circles_tags  where circle_id = ? and tag_id =?)`
		_, err := db.Exec(query, circle_id, v.ID, circle_id, v.ID)
		if err != nil {
			return err
		}
	}
	return nil
}

func InsertTags(db *sql.DB, tags *[]Tag) error {
	for _, v := range *tags {
		query := `insert into tags (name,class_name) 
		select ? ,? from dual
		where not exists (select * from tags  where name =?)`
		_, err := db.Exec(query, v.Name, v.ClassName, v.Name)
		if err != nil {
			return err
		}
	}
	return nil
}

func DeleteCircleSNS(db *sql.DB, sns *[]SNS) error {
	for _, v := range *sns {
		query := `delete from circle_sns where circle_id = ? and name = ?`
		_, err := db.Exec(query, v.CircleID, v.Name)
		if err != nil {
			return err
		}
	}
	return nil
}

func DeleteTags(db *sql.DB, tags *[]Tag) error {
	for _, v := range *tags {
		query := `delete from tags where id = ?`
		_, err := db.Exec(query, v.ID)
		if err != nil {
			return err
		}
		query = `delete from circles_tags where tag_id = ?`
		_, err = db.Exec(query, v.ID)
		if err != nil {
			return err
		}
	}
	return nil
}

func DeleteCircle(db *sql.DB, circle_id int) error {
	query := `delete from circles where id = ?`
	_, err := db.Exec(query, circle_id)
	if err != nil {
		return err
	}
	query = `delete from delegates where circle_id = ?`
	_, err = db.Exec(query, circle_id)
	if err != nil {
		return err
	}
	query = `delete from circles_tags where circle_id = ?`
	_, err = db.Exec(query, circle_id)
	if err != nil {
		return err
	}
	query = `delete from events where circle_id = ?`
	_, err = db.Exec(query, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func UploadCirclePicture(db *sql.DB, circle_id int, image string) error {
	_, err := db.Exec("update circles SET image = ? WHERE  id = ?", image, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func UploadCircleBillPicture(db *sql.DB, circle_id int, image string) error {
	_, err := db.Exec("update circles SET bill_image = ? WHERE  id = ?", image, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func UploadEventPicture(db *sql.DB, circle_id, event_id int, image string) error {
	_, err := db.Exec("update events SET image = ? WHERE  id = ? and circle_id = ?", image, event_id, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func UpdateCircleEvent(db *sql.DB, circle_id, event_id int, event *Event) error {
	query := `update events SET name = ? ,agenda = ?,place = ?,detail = ?,capacity = ?,fee = ? WHERE id = ? and circle_id = ?`
	_, err := db.Exec(query, event.Name, event.Agenda, event.Place, event.Detail, event.Capacity, event.Fee, event_id, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func DeleteCircleEvent(db *sql.DB, circle_id, event_id int) error {
	query := `delete from events where id = ? and circle_id = ?`
	_, err := db.Exec(query, event_id, circle_id)
	if err != nil {
		return err
	}
	query = `delete from events_schedules where id = ?`
	_, err = db.Exec(query, event_id)
	if err != nil {
		return err
	}
	return nil
}

func UpdateCircle(db *sql.DB, circle_id int, circle *Circle) error {
	query := `update circles SET name = ? ,url_name = ?,number = ?,introduction = ?,campus = ?,entrance_fee = ? , annual_fee = ?,activity_of_week = ?,activity_time = ? ,admission_deadline = ? , box_number = ?,booth_number = ? WHERE id = ?`
	_, err := db.Exec(query, circle.Name, circle.URLName, circle.Number, circle.Introduction, circle.Campus, circle.EntranceFee, circle.AnnualFee, circle.ActivityOfWeek, circle.ActivityTime, circle.AdmissionDeadline, circle.BoxNumber, circle.BoothNumber, circle_id)
	if err != nil {
		return err
	}
	query = `update delegates SET name = ?,contact = ? where circle_id = ?`
	_, err = db.Exec(query, circle.DelegateName, circle.DelegateContact, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func DeleteCircleTags(db *sql.DB, circle_id int, tags *[]Tag) error {
	for _, v := range *tags {
		query := `delete from circles_tags where circle_id = ? and tag_id = ?`
		_, err := db.Exec(query, circle_id, v.ID)
		if err != nil {
			return err
		}
	}
	return nil
}

func GetCircleIDAfterInsert(db *sql.DB, circle *Circle) int {
	query := `select id from circles where url_name = ?`
	row, _ := db.Query(query, circle.URLName)
	var id int
	row.Scan(&id)
	return id
}

func GetEventIDAfterInsert(db *sql.DB, event *Event) int {
	query := `select id from events where circle_id = ? and name = ? `
	row, _ := db.Query(query, event.ID, event.Name)
	var id int
	row.Scan(&id)
	return id
}
