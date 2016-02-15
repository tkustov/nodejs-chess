import io from 'socket.io-client';
import chess from './chess';

let socket = io();

socket.on('msg', msg => console.log(msg));
