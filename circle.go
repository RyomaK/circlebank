package circlebank

import (
	"database/sql"
	"log"

	"github.com/gorilla/mux"

	"net/http"

	"github.com/RyomaK/circlebank/controller"
	"github.com/RyomaK/circlebank/model/db"
)

type Server struct {
	db  *sql.DB
	mux *mux.Router
}

func New() *Server {
	return &Server{}
}

func (s *Server) Init(dbconfig string) {
	s.db = db.DBConnect(dbconfig)
	s.Route()
}

func (s *Server) Route() {
	r := mux.NewRouter()

	r.HandleFunc("/api/{univ}/circle/{name}", controller.CircleHandler).Methods("GET")
	r.HandleFunc("/api/{univ}/search", controller.SearchHandler)
	s.mux = r
}

func (s *Server) Run(addr string) {
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":8080", s.mux))
}
