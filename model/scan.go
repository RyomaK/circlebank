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
		&s.Image,
		&s.BillImage,
		&s.Introduction,
		&s.DelegateName,
		&s.DelegateContact,
		&s.Campus,
		&s.EntranceFee,
		&s.AnnualFee,
		&s.ActivityOfWeek,
		&s.ActivityTime,
		&s.AdmissionDeadline,
		&s.BoxNumber,
		&s.BoothNumber,
	); err != nil {
		return &Circle{}, err
	}
	return &s, nil
}

func ScanCircles(rs *sql.Rows) (*[]Circle, error) {
	var structs []Circle
	if rs == nil {
		return nil, nil
	}
	for rs.Next() {
		var s = Circle{}
		if err := rs.Scan(
			&s.ID,
			&s.Name,
			&s.URLName,
			&s.Number,
			&s.Image,
			&s.BillImage,
			&s.Introduction,
			&s.DelegateName,
			&s.DelegateContact,
			&s.Campus,
			&s.EntranceFee,
			&s.AnnualFee,
			&s.ActivityOfWeek,
			&s.ActivityTime,
			&s.AdmissionDeadline,
			&s.BoxNumber,
			&s.BoothNumber,
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
	var tags []Tag
	var err error
	for rs.Next() {
		var s Tag
		if err = rs.Scan(
			&s.ID,
			&s.Name,
			&s.ClassName,
		); err != nil {
			return &[]Tag{}, err
		}
		tags = append(tags, s)
	}
	if err = rs.Err(); err != nil {
		return &[]Tag{}, err
	}
	return &tags, nil
}

func ScanUser(r *sql.Row) (*User, error) {
	var s User
	if err := r.Scan(
		&s.ID,
		&s.Name,
		&s.Mail,
		&s.Password,
	); err != nil {
		return &User{}, err
	}
	return &s, nil
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
			&s.CircleURLName,
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

func ScanSNS(rs *sql.Rows) (*[]SNS, error) {
	var sns []SNS
	if rs == nil {
		return nil, nil
	}
	for rs.Next() {
		var s SNS
		if err := rs.Scan(
			&s.CircleID,
			&s.Name,
		); err != nil {
			return &[]SNS{}, err
		}
		sns = append(sns, s)
	}
	if err := rs.Err(); err != nil {
		return &[]SNS{}, err
	}
	return &sns, nil
}
