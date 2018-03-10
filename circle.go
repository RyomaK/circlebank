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
	defer model.DbClose(s.DB)
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
	a := r.PathPrefix("/api").Subrouter()
	//circle
	a.Path("/circle/{circle_name}").HandlerFunc(circles.CircleHandler).Methods("GET")
	a.Path("/circle").HandlerFunc(circles.UnivCircleHandler).Methods("GET")

	//tag
	a.Path("/tag").HandlerFunc(circles.TagHandler).Methods("GET")
	a.Path("/tag/{id:[0-9]+}").HandlerFunc(circles.TagCirclesHandler).Methods("GET")
	//event
	a.Path("/circle/{circle_name}/{event_id:[0-9]+}").HandlerFunc(events.EventDetailHandler).Methods("GET")
	a.Path("/event").HandlerFunc(events.RecentEventHandler).Methods("GET")

	//subrouter-Admin
	admin := mux.NewRouter()
	r.PathPrefix("/admin").Handler(negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(admin),
	))
	b := admin.PathPrefix("/admin").Subrouter()
	//一覧表示
	b.Path("/circle").HandlerFunc(admins.AdminCircleHandler).Methods("GET")
	b.Path("/circle/event").HandlerFunc(admins.AdminCircleEventHandler).Methods("GET")
	//データ入力
	b.Path("/tag").HandlerFunc(admins.PostAdminTagHandler).Methods("POST")
	b.Path("/tag").HandlerFunc(admins.PostAdminTagHandler).Methods("DELETE")
	b.Path("/circle").HandlerFunc(admins.PostAdminCircleHandler).Methods("POST")
	b.Path("/circle/{circle_id:[0-9]+}").HandlerFunc(admins.UpdateAdminCircleHandler).Methods("PUT")
	b.Path("/circle/{circle_id:[0-9]+}").HandlerFunc(admins.DeleteAdminCircleHandler).Methods("DELETE")
	b.Path("/circle/{circle_id:[0-9]+}/event").HandlerFunc(admins.PostAdminCircleEventHandler).Methods("POST")
	b.Path("/circle/{circle_id:[0-9]+}/event/{event_id:[0-9]+}").HandlerFunc(admins.DeleteAdminCircleEventHandler).Methods("DELETE")
	b.Path("/circle/{circle_id:[0-9]+}/event/{event_id:[0-9]+}").HandlerFunc(admins.UpdateAdminCircleEventHandler).Methods("PUT")
	b.Path("/circle/{circle_id:[0-9]+}/tag").HandlerFunc(admins.PostAdminCircleTagHandler).Methods("POST")
	b.Path("/circle/{circle_id:[0-9]+}/tag").HandlerFunc(admins.DeleteAdminCircleTagHandler).Methods("DELETE")
	b.Path("/circle/{circle_id:[0-9]+}/sns").HandlerFunc(admins.InsertCircleSNS).Methods("POST")
	b.Path("/circle/{circle_id:[0-9]+}/sns").HandlerFunc(admins.InsertCircleSNS).Methods("DELETE")
	//画像upload
	b.Path("/circle/{circle_id:[0-9]+}/upload").HandlerFunc(admins.UploadCirclePicture).Methods("POST")
	b.Path("/circle/{circle_id:[0-9]+}/event/{event_id:[0-9]+}/upload").HandlerFunc(admins.UploadEventPicture).Methods("POST")
	//all handler add middleware
	n := negroni.New()
	n.Use(negroni.NewLogger())
	n.UseHandler(r)

	//mux
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":"+addr, n))
}
