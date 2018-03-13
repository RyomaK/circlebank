DBNAME:=circle_bank

#DBCONFIG:=root:@/circle_bank?parseTime=true
ADDR:=8080

install:
	go get -u github.com/golang/dep/cmd/dep
	dep init

build:
	go  build -o ./cmd/circle/circle ./cmd/circle/circle.go

run:
	go build -o ./cmd/circle/circle ./cmd/circle/circle.go
	./cmd/circle/circle -dbconfig $(DBCONFIG) -addr $(ADDR)

test:
	go test -v ./...

migrate/init:
	mysql -u root -h localhost --protocol tcp -e "create database \`$(DBNAME)\`" -p


migrate/seed:
	mysql -u root -p $(DBNAME) < ./model/dump/1_init.sql
	mysql -u root -p $(DBNAME) < ./model/dump/2_dump.sql
