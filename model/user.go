package model

import (
	"database/sql"
	"log"
	"strconv"
)

func UserExist(db *sql.DB, mail string) bool {
	row := db.QueryRow(`SELECT id from users where mail = ?`, mail)
	var id string
	row.Scan(&id)
	if id != "" {
		return true
	}
	return false
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

func Regist(db *sql.DB, user User) error {
	stmt, err := db.Prepare("INSERT users SET univ_id=?, name=?,mail=?,password=?,sex=?,department=?,subject=?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(GetUnivID(db, user.University), user.Name, user.Mail, user.Image, user.Sex, user.Department, user.Subject)
	if err != nil {
		return err
	}
	stmt.Close()
	return nil
}

func GetUserPass(db *sql.DB, mail string) string {
	row := db.QueryRow(`SELECT password from users where mail = ?`, mail)
	var pass string
	row.Scan(&pass)
	return pass
}

func GetUser(db *sql.DB, mail string) (User, error) {
	row := db.QueryRow(`SELECT * from users where mail = ?`, mail)
	user, err := ScanUser(row)
	if err != nil {
		log.Printf("mail:%v,err:%v", mail, err)
		return User{}, err
	}
	return user, nil
}
