package model

import (
	"database/sql"
	"log"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

func UserExist(db *sql.DB, mail string) bool {
	var id int
	row := db.QueryRow(`SELECT id from users where mail = ? `, mail).Scan(&id)
	if row == sql.ErrNoRows {
		return false
	}
	return true
}

func GetUserID(db *sql.DB, mail string) uint {
	row := db.QueryRow(`SELECT id from users where mail = ?`, mail)
	var user_id string
	row.Scan(&user_id)
	id, err := strconv.ParseUint(user_id, 10, 32)
	if err != nil {
		log.Printf("err GetuserID: %v", err)
	}
	return uint(id)
}

func GetUnivID(db *sql.DB, name string) uint {
	row := db.QueryRow(`SELECT id from universities where name = ?`, name)
	var univ_id string
	row.Scan(&univ_id)
	id, err := strconv.ParseUint(univ_id, 10, 32)
	if err != nil {
		log.Printf("err GetUnivID: %v", err)
	}
	return uint(id)
}

func GetUnivName(db *sql.DB, id string) string {
	row := db.QueryRow(`SELECT name from universities where univ_id = ?`, id)
	var univ string
	row.Scan(&univ)
	return univ
}

func GetUserPass(db *sql.DB, mail string) string {
	row := db.QueryRow(`SELECT password from users where mail = ?`, mail)
	var pass string
	row.Scan(&pass)
	return pass
}

func GetUser(db *sql.DB, mail string) (*Userschedule, error) {
	row := db.QueryRow(`
		SELECT users.id,universities.name as university ,users.name,users.gender,users.mail,users.password,users.image,users.year,users.department,users.subject
		from users
		inner join universities on universities.id = users.univ_id 
		where mail = ?
		`, mail)
	user, err := ScanUser(row)
	if err != nil {
		log.Printf("mail:%v,err:%v", mail, err)
		return &Userschedule{}, err
	}
	rows, _ := db.Query(`SELECT events.id ,events.name,events.image,events.agenda,events.place,events.detail,events.capacity,events.fee
		from users
		inner join events_schedules on events_schedules.user_id = users.id
		inner join events on events.id = events_schedules.event_id 
		where users.mail = ?`, mail)
	events, err := ScanEvents(rows)
	if err != nil {
		log.Printf("mail:%v,err:%v", mail, err)
		return &Userschedule{}, err
	}
	return &Userschedule{
		User:   user,
		Events: events,
	}, nil
}

func IsLogin(db *sql.DB, mail, pass string) bool {
	row := db.QueryRow(`SELECT * from users where mail = ? `, mail)
	user, err := ScanUser(row)
	if err == sql.ErrNoRows {
		return false
	}

	if err = ComparePass(user.Password, pass); err == nil {
		return true
	}
	return false
}

func ComparePass(hash, pass string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(pass))
}

func EncodePass(pass string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pass), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func Regist(db *sql.DB, user User) error {
	stmt, err := db.Prepare("INSERT users SET univ_id=?, name=?,mail=?,password=?,gender=?,department=?,subject=?,image=?,year=?")
	if err != nil {
		return err
	}
	user.Password, err = EncodePass(user.Password)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(GetUnivID(db, user.University), user.Name, user.Mail, user.Password, user.Gender, user.Department, user.Subject, user.Image, user.Year)
	if err != nil {
		return err
	}
	stmt.Close()
	return nil
}

func UpdateProfile(db *sql.DB, id uint, name, mail, pass string) error {
	pass, err := EncodePass(pass)
	if err != nil {
		return err
	}
	_, err = db.Exec("UPDATE users SET name = ?,mail = ?,password = ? WHERE  id= ?", name, mail, pass, id)
	if err != nil {
		return err
	}
	return nil
}

func UpdatePicture(db *sql.DB, mail, image string) error {
	_, err := db.Exec("UPDATE users SET image = ? WHERE  mail= ?", image, mail)
	if err != nil {
		return err
	}
	return nil
}
