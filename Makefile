DBNAME:=circle_bank
ENV:=development

run:
	go run ./cmd/circle/circle.go

test:
	go test -v ./...

migrate/init:
	mysql -u root -h localhost --protocol tcp -e "create database \`$(DBNAME)\`" -p

