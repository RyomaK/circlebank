DBNAME:=circle_bank
ENV:=development

run:
	go run ./cmd/circle/circle.go

test:
	go test -v ./...

migrate/init:
	mysql.server start
	mysql -u root -h localhost --protocol tcp -e "create database \`$(DBNAME)\`" -p
migrate/seed:
	mysql -u root -p -D $(DBname) < dump2.sql
install:
	go get -u github.com/go-sql-driver/mysql
	go get -u github.com/gorilla/mux
	go get -u github.com/gorilla/securecookie
	go get -u github.com/gorilla/sessions
	go get -u golang.org/x/crypto/bcrypt
