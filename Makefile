DBNAME:=circle_bank
ENV:=development

DBCONFIG:="root:password@tcp(db:3306)/circlebank?parseTime=true"
#DBCONFIG:=root:@/circle_bank?parseTime=true
#DBCONFIG:=root:Kenta71619@/circle_bank?parseTime=true
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

docker/build: Dockerfile docker-compose.yml
	docker-compose build

docker/start:
	docker-compose up 

docker/clean:
	docker-compose rm

docker/stop:
	docker-compose down

docker/logs:
	docker-compose logs

docker/db/ssh:
	docker exec -it db  /bin/bash

docker/app/ssh:
	docker exec -it app /bin/bash
