DBNAME:=circle_bank
ENV:=development

DBCONFIG:=root:@/circle_bank?parseTime=true
#DBCONFIG:=root:Kenta71619@/circle_bank?parseTime=true

build:
	go build -o ./cmd/circle/circle ./cmd/circle/circle.go

run:
	go build -o ./cmd/circle/circle ./cmd/circle/circle.go
	./cmd/circle/circle $(DBCONFIG)

test:
	go test -v ./...

migrate/init:

	mysql -u root -h localhost --protocol tcp -e "create database \`$(DBNAME)\`" -p

migrate/seed:

	mysql -u root -p $(DBNAME) < ./model/dump/dump.sql

install:
	go get -u github.com/golang/dep/cmd/dep
	go get -u github.com/tools/godep
	dep init
	dep status
