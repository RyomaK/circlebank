package model

import (
	"database/sql"
	"log"
)

func UserExist(db *sql.DB, mail string) bool {
	row := db.QueryRow(`SELECT * from users where mail = ?`, mail)
	if row != nil {
		return true
	}
	return false
}

func GetUnivID(db *sql.DB, name string) string {
	row := db.QueryRow(`SELECT id from universities where name = ?`, name)
	var univ_id string
	row.Scan(&univ_id)
	return univ_id
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
	_, err = stmt.Exec(GetUnivName(db, user.University), user.Name, user.Mail, user.Password, user.Sex, user.Department, user.Subject)
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

func GetUser(db *sql.DB, mail string) User {
	row := db.QueryRow(`SELECT * from users where mail = ?`, mail)
	user, err := ScanUser(row)
	if err != nil {
		log.Printf("mail:%v,err:%v", mail, err)
	}
	return user
}
