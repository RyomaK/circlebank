DBNAME:=circle_bank
ENV:=development

DBCONFIG:=root:@/circle_bank

build:
	godep	go build -o ./cmd/circle/circle ./cmd/circle/circle.go

run:
	godep go build -o ./cmd/circle/circle ./cmd/circle/circle.go
	./cmd/circle/circle $(DBCONFIG)

test:
	go test -v ./...

migrate/init:
	mysql.server start
	mysql -u root -h localhost --protocol tcp -e "create database \`$(DBNAME)\`" -p

migrate/seed:
	mysql -u root -p $(DBNAME) < ./model/dump/dump1.sql

install:
	go get -u github.com/tools/godep
	godep save
	godep restore
	godep get

