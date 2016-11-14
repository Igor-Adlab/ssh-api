const net = require('net');

///
var socket = new net.Socket({
  allowHalfOpen: true,
  readable: true,
  writable: true
});
socket.connect("/tmp/test-socket.sock", () => {
  setInterval(() => {
    socket.write("New Data 1\n")
  }, 1000);

  socket.on('data', (data) => {
    console.log("[client][data]", data.toString())
  })
});
