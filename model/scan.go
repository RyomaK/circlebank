package model

import (
	"database/sql"
)

func ScanCircleDetail(r *sql.Row) (CircleDetail, error) {
	var s CircleDetail
	if err := r.Scan(
		&s.ID,
		&s.Name,
		&s.Number,
		&s.Introduce,
		&s.MessageForFresh,
		&s.DelegeteName,
		&s.DelegeteContact,
		&s.Campus,
		&s.Excite,
		&s.Fee,
		&s.University,
	); err != nil {
		return CircleDetail{}, err
	}
	return s, nil
}

func ScanCircleDetails(rs *sql.Rows) ([]CircleDetail, error) {
	structs := []CircleDetail{}
	var err error
	for rs.Next() {
		var s CircleDetail
		if err = rs.Scan(
			&s.ID,
			&s.Name,
			&s.Number,
			&s.Introduce,
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
	if err = rs.Err(); err != nil {
		return []CircleDetail{}, err
	}
	return structs, nil
}

func ScanCircle(r *sql.Row) (Circle, error) {
	var s Circle
	if err := r.Scan(
		&s.ID,
		&s.Name,
		&s.Number,
		&s.Introduce,
		&s.Campus,
		&s.Excite,
		&s.Fee,
	); err != nil {
		return Circle{}, err
	}
	return s, nil
}

func ScanCircles(rs *sql.Rows) ([]Circle, error) {
	structs := []Circle{}
	var err error
	for rs.Next() {
		var s = Circle{}
		if err = rs.Scan(
			&s.ID,
			&s.Name,
			&s.Number,
			&s.Introduce,
			&s.Campus,
			&s.Excite,
			&s.Fee,
		); err != nil {
			return nil, err
		}
		structs = append(structs, s)
	}
	if err = rs.Err(); err != nil {
		return []Circle{}, err
	}
	return structs, nil
}

func ScanEvent(r *sql.Row) (Event, error) {
	var s Event
	if err := r.Scan(
		&s.ID,
		&s.Name,
		&s.Content,
		&s.Agenda,
		&s.Detail,
		&s.Capacity,
		&s.Fee,
		&s.University,
	); err != nil {
		return Event{}, err
	}
	return s, nil
}

func ScanEvents(rs *sql.Rows) ([]Event, error) {
	structs := []Event{}
	var err error
	for rs.Next() {
		var s Event
		if err = rs.Scan(
			&s.ID,
			&s.Name,
			&s.Content,
			&s.Agenda,
			&s.Detail,
			&s.Capacity,
			&s.Fee,
			&s.University,
		); err != nil {
			return []Event{}, err
		}
		structs = append(structs, s)
	}
	if err = rs.Err(); err != nil {
		return []Event{}, err
	}
	return structs, nil
}

func ScanTags(rs *sql.Rows) ([]Tag, error) {
	structs := []Tag{}
	var err error
	for rs.Next() {
		var s Tag
		if err = rs.Scan(
			&s.ID,
			&s.Name,
		); err != nil {
			return []Tag{}, err
		}
		structs = append(structs, s)
	}
	if err = rs.Err(); err != nil {
		return []Tag{}, err
	}
	return structs, nil
}

func ScanUser(r *sql.Row) (User, error) {
	var s User
	if err := r.Scan(
		&s.ID,
		&s.University,
		&s.Name,
		&s.Sex,
		&s.Mail,
		&s.Password,
		&s.Image,
		&s.Year,
		&s.Department,
		&s.Subject,
	); err != nil {
		return User{}, err
	}
	return s, nil
}
