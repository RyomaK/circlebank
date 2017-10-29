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

type CircleHandler struct {
}

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

	r.HandleFunc("/api/{univ}/circle/{id}", circles.CircleHandler).Methods("GET")
	r.HandleFunc("/api/{univ}/tag", circles.SearchHandler)
	r.HandleFunc("/api/{univ}/tag/{id}", circles.TagCirclesHandler)

	r.HandleFunc("/api/login", users.LoginHandler).Methods("POST")
	r.HandleFunc("/api/logout", users.LogoutHandler).Methods("POST")
	r.HandleFunc("/api/signup", users.SignUpHandler).Methods("POST")

	r.HandleFunc("/api/user", users.UserHandler).Methods("Get")
	s.mux = r
}

func (s *Server) Run(addr string) {
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":"+addr, s.mux))
}
