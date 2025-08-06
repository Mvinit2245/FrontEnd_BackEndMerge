const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('send_message', (message) => {
  io.emit('receive_message', message)
});

server.listen(3000, () => {
    //storing logic
  console.log('listening on *:3000');
});