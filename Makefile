DBNAME:=circle_bank
ENV:=development

build:
	godep	go build -o ./cmd/circle/circle ./cmd/circle/circle.go

run:
	go build -o ./cmd/circle/circle ./cmd/circle/circle.go
	./cmd/circle/circle

test:
	go test -v ./...

migrate/init:
	mysql.server start
	mysql -u root -h localhost --protocol tcp -e "create database \`$(DBNAME)\`" -p

migrate/seed:
	mysql -u root -p $(DBname) < ./model/dump/dump1.sql

install:
	go get -u github.com/tools/godep
	godep restore
	godep get

