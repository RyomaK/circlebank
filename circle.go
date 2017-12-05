package circlebank

import (
	"database/sql"
	"log"

	"github.com/stretchr/gomniauth"
	"github.com/stretchr/gomniauth/providers/google"

	"github.com/gorilla/mux"

	"net/http"

	"github.com/RyomaK/circlebank/controller"
	"github.com/RyomaK/circlebank/model"
)

type Server struct {
	DB  *sql.DB
	mux *mux.Router
}

type handler func(w http.ResponseWriter, r *http.Request) error

func New() *Server {
	return &Server{}
}

func (s *Server) Init(dbconfig string) {
	s.DB = model.DBConnect(dbconfig)
	s.Route()
}

func (s *Server) Route() {
	//gomniauth　setup
	gomniauth.SetSecurityKey("circlebankfasfdasf")
	gomniauth.WithProviders(
		google.New("765408525427-2ph7u0kfr5j17025c1h0ksn7uj84qr23.apps.googleusercontent.com", "z95TtqTrXjdY77B9JQ_19ePS", "http://localhost:8080/auth/callback/google"),
	)

	r := mux.NewRouter()

	circles := &controller.Circle{DB: s.DB}
	users := &controller.User{DB: s.DB}
	events := &controller.Event{DB: s.DB}
	//circle
	r.HandleFunc("/api/{univ}/circle/{id}", circles.CircleHandler).Methods("GET")
	r.HandleFunc("/api/{univ}/circle", circles.UnivCircleHandler).Methods("GET")
	r.HandleFunc("/api/{univ}/tag/", circles.SearchHandler)
	r.HandleFunc("/api/{univ}/tag/{id}", circles.TagCirclesHandler)
	//session
	/*
		r.HandleFunc("/api/login", users.LoginHandler).Methods("POST")
		r.HandleFunc("/api/logout", users.LogoutHandler).Methods("POST")
		r.HandleFunc("/api/signup", users.SignUpHandler).Methods("POST")
	*/
	r.HandleFunc("/auth/{action}/{provider}", users.LoginHandler)
	//user_data
	r.HandleFunc("/api/user", users.UserHandler).Methods("Get")
	//event
	r.HandleFunc("/api/{univ}/circle/{id}/{event}", events.EventHandler).Methods("GET")
	s.mux = r
}

func (s *Server) Run(addr string) {
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":"+addr, s.mux))
}
