package controller

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
)

type AuthUser struct {
	Mail      string `json:"mail"`
	Authority string
	jwt.StandardClaims
}

type StatusCode struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type StatusAndCircle struct {
	Code     int    `json:"code"`
	Message  string `json:"message"`
	CircleID int    `json:"circle_id"`
}

type StatusAndEvent struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	EventID int    `json:"event_id"`
}

const SecretKey = "75c92a074c341e9964329c0550c2673730ed8479c885c43122c90a2843177d5ef21cb50cfadcccb20aeb730487c11e09ee4dbbb02387242ef264e74cbee97213"

func SetHeader(w http.ResponseWriter, status int) http.ResponseWriter {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Expose-Headers", "Location,Authorization")
	w.WriteHeader(status)
	return w
}

func CreateJWT(user *AuthUser) string {
	token := jwt.New(jwt.GetSigningMethod("HS256"))

	token.Claims = jwt.MapClaims{
		"Mail":      user.Mail,
		"Authority": user.Authority,
	}
	/*
	 トークンに対して署名の付与
	*/
	tokenString, err := token.SignedString([]byte(SecretKey))
	if err != nil {
		log.Printf("%v", err)
		return "error token"
	}
	return tokenString

}
func JwtToData(str string) (AuthUser, error) {
	user := AuthUser{}
	_, err := jwt.ParseWithClaims(str, &user, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return user, err
	}
	return user, nil
}

func getUserEmail(r *http.Request) string {
	jwtString := r.Header.Get("Authorization")
	jwtString = strings.Replace(jwtString, "Bearer ", "", 1)
	user, err := JwtToData(jwtString)
	if err != nil {
		fmt.Printf("err getUser Email %v\n", err)
		return ""
	}
	return user.Mail
}

func WriteJWT(w http.ResponseWriter, mail string) {
	jwtString := CreateJWT(&AuthUser{
		Mail: mail,
	})
	//cookieに保存
	http.SetCookie(w, &http.Cookie{
		Name:  "Authorization",
		Value: jwtString,
		Path:  "/",
	})
}

func escapeSQLString(s string) string {
	if !strings.ContainsAny(s, "%-;#") {
		return s
	}
	return s[:len(s)-1]
}
