package model

import (
	"database/sql"
)

//いらないカラムはスキャンしない
type TrashScanner struct{}

func (TrashScanner) Scan(interface{}) error {
	return nil
}

func ScanCircle(r *sql.Row) (*Circle, error) {
	var s Circle
	if err := r.Scan(
		&s.ID,
		&s.Name,
		&s.URLName,
		&s.Number,
		&s.GenderRatio,
		&s.Image,
		&s.Introduction,
		&s.MessageForFresh,
		&s.DelegeteName,
		&s.DelegeteContact,
		&s.Campus,
		&s.Excite,
		&s.Fee,
		&s.University,
	); err != nil {
		return &Circle{}, err
	}
	return &s, nil
}

func ScanCircles(rs *sql.Rows) (*[]Circle, error) {
	structs := []Circle{}
	for rs.Next() {
		var s = Circle{}
		if err := rs.Scan(
			&s.ID,
			&s.Name,
			&s.URLName,
			&s.Number,
			&s.GenderRatio,
			&s.Image,
			&s.Introduction,
			&s.MessageForFresh,
			&s.DelegeteName,
			&s.DelegeteContact,
			&s.Campus,
			&s.Excite,
			&s.Fee,
			&s.University,
		); err != nil {
			return nil, err
		}
		structs = append(structs, s)
	}
	if err := rs.Err(); err != nil {
		return &[]Circle{}, err
	}
	return &structs, nil
}

func ScanEvent(r *sql.Row) (*Event, error) {
	var s Event
	if err := r.Scan(
		&s.ID,
		&s.Name,
		&s.Image,
		&s.Agenda,
		&s.Place,
		&s.Detail,
		&s.Capacity,
		&s.Fee,
	); err != nil {
		return &Event{}, err
	}
	return &s, nil
}

func ScanEvents(rs *sql.Rows) (*[]Event, error) {
	structs := []Event{}
	for rs.Next() {
		var s Event
		if err := rs.Scan(
			&s.ID,
			&s.Name,
			&s.Image,
			&s.Agenda,
			&s.Place,
			&s.Detail,
			&s.Capacity,
			&s.Fee,
		); err != nil {
			return &[]Event{}, err
		}
		structs = append(structs, s)
	}
	if err := rs.Err(); err != nil {
		return &[]Event{}, err
	}
	return &structs, nil
}

func ScanTags(rs *sql.Rows) (*[]Tag, error) {
	structs := []Tag{}
	var err error
	for rs.Next() {
		var s Tag
		if err = rs.Scan(
			&s.ID,
			&s.Name,
		); err != nil {
			return &[]Tag{}, err
		}
		structs = append(structs, s)
	}
	if err = rs.Err(); err != nil {
		return &[]Tag{}, err
	}
	return &structs, nil
}

func ScanUser(r *sql.Row) (*User, error) {
	var s User
	if err := r.Scan(
		&s.ID,
		&s.University,
		&s.Name,
		&s.Gender,
		&s.Mail,
		&s.Password,
		&s.Image,
		&s.Year,
		&s.Department,
		&s.Subject,
	); err != nil {
		return &User{}, err
	}
	return &s, nil
}

func ScanComment(r *sql.Row) (*Comment, error) {
	var c Comment
	if err := r.Scan(
		&c.ID,
		&c.Name,
		&c.Gender,
		&c.Point,
		&c.Text,
	); err != nil {
		return &Comment{}, err
	}
	return &c, nil
}

func ScanComments(rs *sql.Rows) (*[]Comment, error) {
	structs := []Comment{}
	var err error
	for rs.Next() {
		var s Comment
		if err = rs.Scan(
			&s.ID,
			&s.Name,
			&s.Gender,
			&s.Point,
			&s.Text,
		); err != nil {
			return &[]Comment{}, err
		}
		structs = append(structs, s)
	}
	if err = rs.Err(); err != nil {
		return &[]Comment{}, err
	}
	return &structs, nil
}

func ScanAdminCircleEvents(rs *sql.Rows) (*[]AdminCircleEvents, error) {
	structs := []AdminCircleEvents{}
	for rs.Next() {
		var s AdminCircleEvents
		if err := rs.Scan(
			&s.ID,
			&s.Name,
			&s.Image,
			&s.Agenda,
			&s.Place,
			&s.Detail,
			&s.Capacity,
			&s.Fee,
			&s.CircleID,
			&s.CircleName,
		); err != nil {
			return &[]AdminCircleEvents{}, err
		}
		structs = append(structs, s)
	}
	if err := rs.Err(); err != nil {
		return &[]AdminCircleEvents{}, err
	}
	return &structs, nil
}

func ScanLikeCircleDetails(rs *sql.Rows) (*[]LikeCircleDetail, error) {
	structs := []LikeCircleDetail{}
	for rs.Next() {
		var s LikeCircleDetail
		if err := rs.Scan(
			&s.Circle.ID,
			&s.Circle.Name,
			&s.Circle.URLName,
			&s.Circle.Number,
			&s.Circle.GenderRatio,
			&s.Circle.Image,
			&s.Circle.Introduction,
			&s.Circle.MessageForFresh,
			&s.Circle.DelegeteName,
			&s.Circle.DelegeteContact,
			&s.Circle.Campus,
			&s.Circle.Excite,
			&s.Circle.Fee,
			&s.Circle.University,
			&s.Comment.ID,
			&s.Comment.Name,
			&s.Comment.Gender,
			&s.Comment.Point,
			&s.Comment.Text,
		); err != nil {
			return &[]LikeCircleDetail{}, err
		}
		structs = append(structs, s)
	}
	if err := rs.Err(); err != nil {
		return &[]LikeCircleDetail{}, err
	}
	return &structs, nil
}
