import path from 'path';
import express from 'express';
import { Server } from 'http';
import socket from 'socket.io';

let app = express();
let server = Server(app);
let io = socket(server);

server.listen(8001);

io.on('connection', socket => {
  socket.emit('msg', 'hello world!');
});
