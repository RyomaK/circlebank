curl -S 'localhost:8080/api/circle' 
curl -S 'localhost:8080/api/circle/handsup' 
curl -S 'localhost:8080/api/tag'
curl -S 'localhost:8080/api/tag/1'
curl -S 'localhost:8080/api/circle/handsup/1' 
curl -S 'localhost:8080/api/event?page=1' 
curl -S 'localhost:8080/api/event?page=2' 
curl -S  -H 'Authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRob3JpdHkiOiIxIiwiTWFpbCI6InJ5b29vbWFhYTA0MTNAZ21haWwuY29tIn0.F2rDuN2SagKslobcDDSChCqJkpc0kblzdI5lCmIKxPY' localhost:8080/admin/event
curl -s -H 'Authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRob3JpdHkiOiIxIiwiTWFpbCI6InJ5b29vbWFhYTA0MTNAZ21haWwuY29tIn0.F2rDuN2SagKslobcDDSChCqJkpc0kblzdI5lCmIKxPY' localhost:8080/admin/event?page=2
