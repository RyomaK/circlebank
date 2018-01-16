package model

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func GetCircles(db *sql.DB, univ string, page int) ([]Circle, error) {
	query := `select circles.id,circles.name,circles.url_name,number,circles.gender_ratio,circles.image,introduction,message_for_fresh,  delegetes.name as delegate_name ,delegetes.contact as delegate_contact,campus,excite,fee,universities.name as university
	from (circles inner join universities on univ_id = universities.id)
	left outer join delegetes on circles.id = delegetes.circle_id
	where universities.url_name = ? and circles.id between ?+0 and ?+30 order by circles.id`
	row, _ := db.Query(query, univ, page, page)
	circles, err := ScanCircles(row)
	if err != nil {
		return []Circle{}, err
	}
	return circles, nil
}

func GetEvents(db *sql.DB, univ string, page int) ([]AdminCircleEvents, error) {
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
		return []AdminCircleEvents{}, err
	}

	return events, nil
}
