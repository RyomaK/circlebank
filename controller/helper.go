package controller

import (
	"log"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
)

type AuthUser struct {
	Name  string `json:"name"`
	Mail  string `json:"mail"`
	Image string `json:"Image"`
	jwt.StandardClaims
}

func SecretKey() string {
	return "75c92a074c341e9964329c0550c2673730ed8479c885c43122c90a2843177d5ef21cb50cfadcccb20aeb730487c11e09ee4dbbb02387242ef264e74cbee97213"
}

func SetHeader(w http.ResponseWriter, status int) http.ResponseWriter {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Expose-Headers", "Location")
	w.WriteHeader(status)
	return w
}

func CreateJWT(user *AuthUser) string {
	token := jwt.New(jwt.GetSigningMethod("HS256"))

	token.Claims = jwt.MapClaims{
		"Name":  user.Name,
		"Mail":  user.Mail,
		"Image": user.Image,
	}
	/*
	 トークンに対して署名の付与
	*/
	tokenString, err := token.SignedString([]byte(SecretKey()))
	if err != nil {
		log.Printf("%v", err)
		return "error"
	}
	return tokenString

}

func JwtToData(str string) AuthUser {
	user := AuthUser{}
	_, err := jwt.ParseWithClaims(str, &user, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey()), nil
	})
	if err != nil {
		log.Printf("err jwt to data %v", err)
	}
	return user
}

func getUserEmail(r *http.Request) string {
	jwtString := r.Header.Get("user")
	user := JwtToData(jwtString)
	return user.Mail
}
