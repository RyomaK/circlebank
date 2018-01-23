package circlebank

import (
	"database/sql"
	"log"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/urfave/negroni"

	"github.com/gorilla/mux"

	"net/http"

	"github.com/ryomak/circlebank/controller"
	"github.com/ryomak/circlebank/model"
)

type Server struct {
	DB *sql.DB
}

func New() *Server {
	return &Server{}
}

func (s *Server) Run(dbconfig, addr string) {
	s.DB = model.DBConnect(dbconfig)
	s.Route(addr)
}

func (s *Server) Route(addr string) {
	//jwt
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte(controller.SecretKey), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})

	r := mux.NewRouter()

	circles := &controller.Circle{DB: s.DB}
	users := &controller.User{DB: s.DB}
	events := &controller.Event{DB: s.DB}
	admins := &controller.Admin{DB: s.DB}

	//nomal(user)
	r.HandleFunc("/login", users.LoginHandler).Methods("POST")
	r.HandleFunc("/logout", users.LogoutHandler).Methods("POST")
	r.HandleFunc("/signup", users.SignUpHandler).Methods("POST")
	r.HandleFunc("/login", Index).Methods("GET")
	r.HandleFunc("/logout", Index).Methods("GET")
	r.HandleFunc("/signup", Index).Methods("GET")
	r.HandleFunc("/", Index)

	//static
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("public"))))

	//not found
	r.NotFoundHandler = http.HandlerFunc(NotFoundHandler)
	//need login

	//subrouter-User
	acctBase := mux.NewRouter()
	r.PathPrefix("/api").Handler(negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(acctBase),
	))
	a := acctBase.PathPrefix("/api").Subrouter()
	//circle
	a.Path("/{univ}/circle/{circle_name}").HandlerFunc(circles.CircleHandler).Methods("GET")
	a.Path("/{univ}/circle").HandlerFunc(circles.UnivCircleHandler).Methods("GET")

	//tag
	a.Path("/{univ}/tag").HandlerFunc(circles.SearchHandler).Methods("GET")
	a.Path("/{univ}/tag/{id}").HandlerFunc(circles.TagCirclesHandler).Methods("GET")
	//event
	a.Path("/{univ}/circle/{circle_name}/{event_id}").HandlerFunc(events.EventHandler).Methods("GET")
	//user data
	a.Path("/user").HandlerFunc(users.UserHandler).Methods("GET")
	a.Path("/user").HandlerFunc(users.UserUpdateHandler).Methods("POST")
	a.Path("/user/like").HandlerFunc(users.GetLikeCircleHandler).Methods("GET")
	a.Path("/user/like").HandlerFunc(users.PostLikeCircleHandler).Methods("POST")
	a.Path("/user/like").HandlerFunc(users.DeleteLikeCircleHandler).Methods("DELETE")
	a.Path("/user/event").HandlerFunc(users.PostEvent).Methods("POST")
	a.Path("/user/event").HandlerFunc(users.DeleteEvent).Methods("DELETE")
	a.Path("/user/{circle_name}/comment").HandlerFunc(users.GetCircleCommentHandler).Methods("GET")
	a.Path("/user/{circle_name}/comment").HandlerFunc(users.PostCircleCommentHandler).Methods("POST")
	a.Path("/user/{circle_name}/comment").HandlerFunc(users.DeleteCircleCommentHandler).Methods("DELETE")
	//画像アップロード
	a.Path("/user/upload").HandlerFunc(users.UploadPicture).Methods("POST")

	//subrouter-Admin
	//to-do adminだけしかadmin/には入れないようにする
	admin := mux.NewRouter()
	r.PathPrefix("/admin").Handler(negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.HandlerFunc(controller.MiddlewareAdmin),
		negroni.Wrap(admin),
	))
	b := admin.PathPrefix("/admin").Subrouter()
	//一覧表示
	b.Path("/{univ}/circle").HandlerFunc(admins.AdminCircleHandler).Methods("GET")
	b.Path("/{univ}/circle/event").HandlerFunc(admins.AdminCircleEventHandler).Methods("GET")
	b.Path("/{univ}/circle/{circle_name}").HandlerFunc(admins.AdminCircleDetailHandler).Methods("GET")
	//データ入力
	b.Path("/tag").HandlerFunc(admins.PostAdminTagHandler).Methods("POST")
	b.Path("/{univ}/circle").HandlerFunc(admins.PostAdminCircleHandler).Methods("POST")
	b.Path("/{univ}/circle/{circle_id}").HandlerFunc(admins.UpdateAdminCircleHandler).Methods("PUT")
	b.Path("/{univ}/circle/{circle_id}").HandlerFunc(admins.DeleteAdminCircleHandler).Methods("DELETE")
	b.Path("/{univ}/circle/{circle_id}/event").HandlerFunc(admins.PostAdminCircleEventHandler).Methods("POST")
	b.Path("/{univ}/circle/{circle_id}/event/{event_id}").HandlerFunc(admins.DeleteAdminCircleEventHandler).Methods("DELETE")
	b.Path("/{univ}/circle/{circle_id}/event/{event_id}").HandlerFunc(admins.UpdateAdminCircleEventHandler).Methods("PUT")
	b.Path("/{univ}/circle/{circle_id}/tag").HandlerFunc(admins.PostAdminCircleTagHandler).Methods("POST")
	b.Path("/{univ}/circle/{circle_id}/tag").HandlerFunc(admins.DeleteAdminCircleTagHandler).Methods("DELETE")
	b.Path("/{univ}/circle/{circle_id}/tag").HandlerFunc(admins.UpdateAdminCircleTagHandler).Methods("PUT")
	//画像upload
	b.Path("/{univ}/circle/{circle_id}/upload").HandlerFunc(admins.UploadCirclePicture).Methods("POST")
	b.Path("/{univ}/circle/{circle_id}/event/{event_id}/upload").HandlerFunc(admins.UploadEventPicture).Methods("POST")
	//all handler add middleware
	n := negroni.New()
	n.Use(negroni.NewLogger())
	n.UseHandler(r)

	//mux
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":"+addr, n))
}
