DBNAME:=circle_bank
ENV:=development

build:
	godep	go build -o ./cmd/circle/circle ./cmd/circle/circle.go

run:
	./cmd/circle/circle

test:
	go test -v ./...

migrate/init:
	mysql.server start
	mysql -u root -h localhost --protocol tcp -e "create database \`$(DBNAME)\`" -p

migrate/seed:
	mysql -u root -p $(DBname) < ./model/dump/dump1.sql

install:
	go get github.com/kr/godep
	go get -u github.com/go-sql-driver/mysql
	go get -u github.com/gorilla/mux
	go get -u github.com/gorilla/securecookie
	go get -u github.com/gorilla/sessions
	go get -u github.com/stretchr/objx
	go get -u github.com/stretchr/gomniauth
	godep get
