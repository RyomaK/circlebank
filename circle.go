package circlebank

import (
	"database/sql"
	"log"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/urfave/negroni"

	"github.com/gorilla/mux"

	"net/http"

	"github.com/RyomaK/circlebank/controller"
	"github.com/RyomaK/circlebank/model"
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
	//nomal
	r.HandleFunc("/login", users.LoginHandler).Methods("POST")
	r.HandleFunc("/logout", users.LogoutHandler).Methods("POST")
	r.HandleFunc("/signup", users.SignUpHandler).Methods("POST")
	r.HandleFunc("/", Index)
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("public"))))
	/*
		Test
		r.HandleFunc("/ping", Ex)
	*/
	//not found
	r.NotFoundHandler = http.HandlerFunc(NotFoundHandler)
	//need login
	//subrouter
	acctBase := mux.NewRouter()
	r.PathPrefix("/api").Handler(negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(acctBase),
	))
	a := acctBase.PathPrefix("/api").Subrouter()
	//circle
	a.Path("/{univ}/circle/{name}").HandlerFunc(circles.CircleHandler).Methods("GET")
	a.Path("/{univ}/circle").HandlerFunc(circles.UnivCircleHandler).Methods("GET")
	//tag
	a.Path("/{univ}/tag").HandlerFunc(circles.SearchHandler)
	a.Path("/{univ}/tag/{id}").HandlerFunc(circles.TagCirclesHandler)
	//event
	a.Path("/{univ}/circle/{name}/{event}").HandlerFunc(events.EventHandler).Methods("GET")
	//user data
	a.Path("/user").HandlerFunc(users.UserHandler).Methods("GET")
	a.Path("/user").HandlerFunc(users.UserUpdateHandler).Methods("POST")
	//画像アップロード
	a.Path("/user/upload").HandlerFunc(users.UploadPicture).Methods("POST")

	//all handler add middleware
	n := negroni.New()
	n.Use(negroni.NewLogger())
	n.UseHandler(r)

	//mux
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":"+addr, n))
}
