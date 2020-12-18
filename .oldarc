@app
test-ws

@ws
# no further config required
# client code is in /public
# serverless code is in /src/ws/*
connect
  src dist/ws/connect

default
  src dist/ws/default

disconnect 
  src dist/ws/disconnect

@http
/
  method get
  src dist/http/get-index

@static
