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
	admins := &controller.Admin{DB: s.DB}

	//nomal(user)
	r.HandleFunc("/login", users.LoginHandler).Methods("POST")
	r.HandleFunc("/logout", users.LogoutHandler).Methods("POST")
	r.HandleFunc("/signup", users.SignUpHandler).Methods("POST")
	r.HandleFunc("/", Index)

	//admin
	//r.HandleFunc("/login", users.LoginHandler)

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
	a.Path("/{univ}/circle/{circle_name}/comment").HandlerFunc(circles.GetCircleCommentHandler).Methods("GET")
	a.Path("/{univ}/circle/{circle_name}/comment").HandlerFunc(circles.PostCircleCommentHandler).Methods("POST")
	a.Path("/{univ}/circle/{circle_name}/comment").HandlerFunc(circles.DeleteCircleCommentHandler).Methods("DELETE")
	//tag
	a.Path("/{univ}/tag").HandlerFunc(circles.SearchHandler)
	a.Path("/{univ}/tag/{id}").HandlerFunc(circles.TagCirclesHandler)
	//event
	a.Path("/{univ}/circle/{circle_name}/{event}").HandlerFunc(events.EventHandler).Methods("GET")
	//user data
	a.Path("/user").HandlerFunc(users.UserHandler).Methods("GET")
	a.Path("/user").HandlerFunc(users.UserUpdateHandler).Methods("POST")
	a.Path("/user/like").HandlerFunc(users.GetLikeCircleHandler).Methods("GET")
	a.Path("/user/like").HandlerFunc(users.PostLikeCircleHandler).Methods("POST")
	a.Path("/user/like").HandlerFunc(users.DeleteLikeCircleHandler).Methods("DELETE")
	a.Path("/user/event").HandlerFunc(users.PostEvent).Methods("POST")
	a.Path("/user/event").HandlerFunc(users.DeleteEvent).Methods("DELETE")
	//画像アップロード
	a.Path("/user/upload").HandlerFunc(users.UploadPicture).Methods("POST")

	//subrouter-Admin
	admin := mux.NewRouter()
	r.PathPrefix("/admin").Handler(negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(admin),
	))
	b := admin.PathPrefix("/admin").Subrouter()
	b.Path("/{univ}/circle").HandlerFunc(admins.AdminCircleHandler).Methods("GET")
	b.Path("/{univ}/circle/event").HandlerFunc(admins.AdminEventHandler).Methods("GET")
	b.Path("/{univ}/circle/{circle_name}").HandlerFunc(admins.AdminCircleDetailHandler).Methods("GET")

	//all handler add middleware
	n := negroni.New()
	n.Use(negroni.NewLogger())
	n.UseHandler(r)

	//mux
	log.Printf("start listening on %s", addr)
	log.Fatal(http.ListenAndServe(":"+addr, n))
}
