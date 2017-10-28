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

	r.HandleFunc("/api/{univ}/circle/{id}", circles.CircleHandler).Methods("GET")
	r.HandleFunc("/api/{univ}/tag", circles.SearchHandler)
	r.HandleFunc("/api/{univ}/tag/{id}", circles.TagCirclesHandler)
	s.mux = r
}

func (s *Server) Run(addr string) {
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":8080", s.mux))
}
