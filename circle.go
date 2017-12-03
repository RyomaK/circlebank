package circlebank

import (
	"database/sql"
	"log"

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
	r.HandleFunc("/api/login", users.LoginHandler).Methods("POST")
	r.HandleFunc("/api/logout", users.LogoutHandler).Methods("POST")
	r.HandleFunc("/api/signup", users.SignUpHandler).Methods("POST")
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
