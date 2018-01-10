package circlebank

import (
	"net/http"

	"github.com/RyomaK/circlebank/controller"
)

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	str := "ないよ"
	w.Write([]byte(str))

}
func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
	w = controller.SetHeader(w, 200)
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
