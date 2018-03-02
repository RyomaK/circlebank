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

func GetUserPass(db *sql.DB, mail string) string {
	row := db.QueryRow(`SELECT password from users where mail = ?`, mail)
	var pass string
	row.Scan(&pass)
	return pass
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
	stmt, err := db.Prepare("INSERT users SET name=?,mail=?,password=?")
	if err != nil {
		return err
	}
	user.Password, err = EncodePass(user.Password)
	if err != nil {
		return err
	}
	_, err = stmt.Exec( user.Name, user.Mail, user.Password)
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
