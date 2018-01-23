package circlebank

import (
	"encoding/json"
	"net/http"

	"github.com/ryomak/circlebank/controller"
)

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w = controller.SetHeader(w, http.StatusNotFound)
	status := controller.StatusCode{Code: http.StatusNotFound, Message: "cannot regist event"}
	res, _ := json.Marshal(status)
	w.Write(res)
}
func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
}

/*
TESTよう
func Ex(w http.ResponseWriter, r *http.Request) {
	jwt := controller.CreateJWT(&controller.AuthUser{Name: "ryoma", Mail: "a.com", Image: "a.jpg"})
	w.Header().Set("Authorization",jwt)
	usr := controller.JwtToData(jwt)
	fmt.Printf("%v", usr.Name)
}
*/
