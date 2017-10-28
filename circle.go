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
	db  *sql.DB
	mux *mux.Router
}

func New() *Server {
	return &Server{}
}

func (s *Server) Init(dbconfig string) {
	s.db = model.DBConnect(dbconfig)
	s.Route()
}

func (s *Server) Route() {
	r := mux.NewRouter()

	r.HandleFunc("/api/{univ}/circle/{id}", controller.CircleHandler).Methods("GET")
	r.HandleFunc("/api/{univ}/tag", controller.SearchHandler)
	r.HandleFunc("/api/{univ}/tag/{id}", controller.TagCirclesHandler)
	s.mux = r
}

func (s *Server) Run(addr string) {
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":8080", s.mux))
}
