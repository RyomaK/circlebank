package circlebank

import (
	"database/sql"
	"log"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/stretchr/gomniauth"
	"github.com/stretchr/gomniauth/providers/google"
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
	//gomniauth　setup
	gomniauth.SetSecurityKey("circlebankf")
	gomniauth.WithProviders(
		google.New("655485724445-iunu8tkefi5a8m8hlhhl7aflcrj6rdcq.apps.googleusercontent.com", "oXM3x_I4iiBH8MYRvlevaeQd", "http://localhost:8080/auth/callback/google"),
	)
	//jwt
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte(controller.SecretKey()), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})

	r := mux.NewRouter()

	circles := &controller.Circle{DB: s.DB}
	users := &controller.User{DB: s.DB}
	events := &controller.Event{DB: s.DB}
	//nomal
	r.HandleFunc("/auth/{action}/{provider}", users.LoginHandler)
	r.HandleFunc("/logout", users.LogoutHandler) //.Methods("POST")
	r.HandleFunc("/signup", users.SignUpHandler).Methods("POST")
	r.HandleFunc("/signup", users.SignUpViewHandler).Methods("GET")
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
	a.Path("/{univ}/circle/{id}").HandlerFunc(circles.CircleHandler).Methods("GET")
	a.Path("/{univ}/circle").HandlerFunc(circles.UnivCircleHandler).Methods("GET")
	//tag
	a.Path("/{univ}/tag/").HandlerFunc(circles.SearchHandler)
	a.Path("/{univ}/tag/{id}").HandlerFunc(circles.TagCirclesHandler)
	//event
	a.Path("/{univ}/circle/{id}/{event}").HandlerFunc(events.EventHandler).Methods("GET")
	//user data
	a.Path("/user").HandlerFunc(users.UserHandler).Methods("GET")
	a.Path("/user").HandlerFunc(users.UserHandler).Methods("POST")

	//all handler add middleware
	n := negroni.New()
	n.Use(negroni.NewLogger())
	n.UseHandler(r)

	//mux
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":"+addr, n))
}
