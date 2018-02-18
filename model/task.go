package model

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func GetCircleDetail(db *sql.DB, univ, circle_url_name string) (*CircleDetail, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name as university
	from (circles inner join universities on univ_id = universities.id)
	left outer join delegetes on circles.id = delegetes.circle_id
	where universities.url_name = ? and circles.url_name = ?;`
	row := db.QueryRow(query, univ, circle_url_name)
	circle, err := ScanCircle(row)
	if err != nil {
		return &CircleDetail{}, err
	}
	events, err := GetCircleEvents(db, univ, circle_url_name)
	if err != nil {
		fmt.Print(err)
	}

	tags, err := GetCircleTags(db, univ, circle_url_name)
	if err != nil {
		fmt.Print(err)
	}
	return &CircleDetail{
		Circle: *circle,
		Events: *events,
		Tags:   *tags,
	}, nil

}

func GetUnivCircles(db *sql.DB, univ string) (*[]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name as university
	from (circles inner join universities on univ_id = universities.id)
	left outer join delegetes on circles.id = delegetes.circle_id
	where universities.url_name = ? `
	rows, _ := db.Query(query, univ)
	circles, err := ScanCircles(rows)
	if err != nil {
		return &[]Circle{}, err
	}
	return circles, nil
}

func GetTagCircles(db *sql.DB, univ_name, tag_id string) (*[]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh, delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name
	from (circles inner join universities on univ_id = universities.id)
	inner join circles_tags on circles.id = circles_tags.circle_id
	left outer join delegetes on circles.id = delegetes.circle_id	
	inner join tags on circles_tags.tag_id = tags.id
	where universities.url_name = ?  and  tags.id = ?`
	rows, _ := db.Query(query, univ_name, tag_id)
	circles, err := ScanCircles(rows)
	if err != nil {
		return &[]Circle{}, err
	}
	return circles, nil
}

func GetTags(db *sql.DB, univ_name string, title ...string) (*[]ClassedTag, error) {
	tags := []ClassedTag{}
	for _, v := range title {
		fmt.Printf("%s\n", v)
		query := `select distinct tags.id, tags.name
		from (circles inner join universities on circles.univ_id = universities.id)
		inner join circles_tags on circles.id = circles_tags.circle_id
		inner join tags on circles_tags.tag_id = tags.id
		where universities.url_name = ? and tags.class_name = ?`
		rows, _ := db.Query(query, univ_name, v)
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
	fmt.Printf("%+v\n", tags)
	return &tags, nil
}

func GetCircleTags(db *sql.DB, univ_name, circle_name string) (*[]Tag, error) {
	query := `select tags.id, tags.name
			  from (circles inner join universities on circles.univ_id = universities.id)
			  inner join circles_tags on circles.id = circles_tags.circle_id
			  inner join tags on circles_tags.tag_id = tags.id
			  where universities.url_name = ? and circles.url_name= ?`
	rows, _ := db.Query(query, univ_name, circle_name)
	tags, err := ScanTags(rows)
	if err != nil {
		return &[]Tag{}, err
	}
	return tags, err
}

func GetCircleEventDetail(db *sql.DB, univ, circle_name, id string) (*Event, error) {
	query := `select events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee
		from (circles left outer join universities on univ_id = universities.id)
		inner join events on events.circle_id = circles.id
		where universities.url_name = ? and circles.url_name = ? and events.id = ?`
	row := db.QueryRow(query, univ, circle_name, id)
	event, err := ScanEvent(row)
	if err != nil {
		return &Event{}, err
	}
	return event, nil
}

func GetCircleEvents(db *sql.DB, univ, circle_name string) (*[]Event, error) {
	query := `select events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee
		from (circles left outer join universities on univ_id = universities.id)
		inner join events on events.circle_id = circles.id
		where universities.url_name = ? and circles.url_name = ?;`
	rows, _ := db.Query(query, univ, circle_name)
	events, err := ScanEvents(rows)
	if err != nil {
		return &[]Event{}, err
	}
	return events, nil
}

func DeleteEvent(db *sql.DB, mail, event_id string) error {
	id := GetUserID(db, mail)
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
			(user_id,event_id) 
			select ?,?
			from dual
			where not exists(select user_id FROM events_schedules WHERE user_id=? and event_id=?)`
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id, event_id, id, event_id)
	if err != nil {
		return err
	}
	return nil
}

func GetUserLikeCircles(db *sql.DB, mail string) (*[]LikeCircleDetail, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name as university ,comments.id,users.name,users.gender,comments.point,comments.text
	from circles
	inner join delegetes on circles.id = delegetes.circle_id
	inner join universities on univ_id = universities.id
	inner join likes on likes.circle_id = circles.id
	inner join users on users.id = likes.user_id
	left  join comments on comments.user_id = users.id and comments.circle_id = circles.id
	where users.mail = ?`
	rows, _ := db.Query(query, mail)
	circles, err := ScanLikeCircleDetails(rows)
	if err != nil {
		return &[]LikeCircleDetail{}, err
	}
	return circles, nil
}

func PostUserLikesCircles(db *sql.DB, mail, circle_id string) error {
	id := GetUserID(db, mail)
	query := `insert  into likes
			(user_id,likes.circle_id) 
			select ?,?
			FROM dual
			where not exists(select user_id FROM likes WHERE user_id=? and likes.circle_id= ?)`
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id, circle_id, id, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func DeleteUserLikesCircles(db *sql.DB, mail, circle_id string) error {
	id := GetUserID(db, mail)
	query := `delete
	from likes 
	where likes.user_id = ?  and likes.circle_id = ?`
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func PostCiecleComments(db *sql.DB, mail, circle_id, point, text string) error {
	id := GetUserID(db, mail)
	query := `insert  into comments
			(user_id,comments.circle_id,point,text) 
			select ?,?,?,?
			FROM dual
			where not exists(select user_id FROM comments WHERE user_id=? and comments.circle_id= ?)`
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id, circle_id, point, text, id, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func DeleteCiecleComments(db *sql.DB, mail, circle_id string) error {
	id := GetUserID(db, mail)
	query := `delete
	from comments 
	where comments.user_id = ?  and comments.circle_id = ?`
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id, circle_id)
	if err != nil {
		return err
	}
	return nil
}

func GetCircleComment(db *sql.DB, mail, circle_url_name string) (*CircleComment, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name as university
	from (circles inner join universities on univ_id = universities.id)
	left outer join delegetes on circles.id = delegetes.circle_id
	where  circles.url_name = ?;`
	row := db.QueryRow(query, circle_url_name)
	circle, err := ScanCircle(row)
	if err != nil {
		return &CircleComment{}, err
	}
	query = `select comments.id,users.name,users.gender,comments.point,comments.text
	from circles
	inner join comments on circles.id = comments.circle_id
	inner join users on comments.user_id = users.id
	where users.mail = ? and circles.url_name = ?`
	row = db.QueryRow(query, mail, circle_url_name)
	comment, err := ScanComment(row)
	if err != nil {
		return &CircleComment{Circle: *circle}, err
	}
	return &CircleComment{Circle: *circle, Comment: *comment}, nil
}

func UpdateCiecleComments(db *sql.DB, mail, circle_id, point, text string) error {
	id := GetUserID(db, mail)
	query := `update comments
			set point = ? ,text = ?,created_at = ?
			where user_id = ? and circle_id = ?
			`
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	now := time.Now()
	_, err = stmt.Exec(point, text, now, id, circle_id)
	if err != nil {
		return err
	}
	return nil
}
