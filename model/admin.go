package model

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func GetCircles(db *sql.DB, univ string, page int) (*[]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name as university
	from (circles inner join universities on univ_id = universities.id)
	left outer join delegetes on circles.id = delegetes.circle_id
	where universities.url_name = ? and circles.id between ?+0 and ?+30 order by circles.id`
	row, _ := db.Query(query, univ, page, page)
	circles, err := ScanCircles(row)
	if err != nil {
		return &[]Circle{}, err
	}
	return circles, nil
}

func GetEvents(db *sql.DB, univ string, page int) (*[]AdminCircleEvents, error) {
	num := 30 //所得件数
	query := `select events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee,circles.id as circle_id ,circles.name as circle_name
			from (circles inner join universities on univ_id = universities.id)
			inner join events on events.circle_id = circles.id
			where universities.url_name = ? 
			order by events.agenda 
			limit  ?,?`
	pageMin := num * (page - 1)
	pageMax := num + pageMin
	rows, _ := db.Query(query, univ, pageMin, pageMax)

	events, err := ScanAdminCircleEvents(rows)
	if err != nil {
		return &[]AdminCircleEvents{}, err
	}

	return events, nil
}

func InsertCircle(db *sql.DB, circle *Circle) error {
	query := `insert into circles (univ_id,name,url_name,number,gender_ratio,introduction,excite,fee,campus,message_for_fresh) values (?,?,?,?,?,?,?,?,?,?)`
	result, err := db.Exec(query, "1", circle.Name, circle.URLName, circle.Number, circle.GenderRatio, circle.Introduction, circle.Excite, circle.Fee, circle.Campus, circle.MessageForFresh)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	query = `insert into delegetes (circle_id,name,contact) values(?,?,?)`
	_, err = db.Exec(query, id, circle.DelegeteName, circle.DelegeteContact)
	if err != nil {
		return err
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
		query := `insert into tags (name) 
		select ? from dual
		where not exists (select * from tags  where name =?)`
		_, err := db.Exec(query, v.Name, v.Name)
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
	query = `delete from delegetes where circle_id = ?`
	_, err = db.Exec(query, circle_id)
	if err != nil {
		return err
	}
	query = `delete from likes where circle_id = ?`
	_, err = db.Exec(query, circle_id)
	if err != nil {
		return err
	}
	query = `delete from comments where circle_id = ?`
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
	query := `update circles SET name = ? ,url_name = ?,number = ?,gender_ratio = ?,introduction = ?,excite = ? ,fee = ?,campus = ?,message_for_fresh = ? WHERE id = ?`
	_, err := db.Exec(query, circle.Name, circle.URLName, circle.Number, circle.GenderRatio, circle.Introduction, circle.Excite, circle.Fee, circle.Campus, circle.MessageForFresh, circle_id)
	if err != nil {
		return err
	}
	query = `update delegetes SET name = ?,contact = ? where circle_id = ?`
	_, err = db.Exec(query, circle.DelegeteName, circle.DelegeteContact, circle_id)
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
