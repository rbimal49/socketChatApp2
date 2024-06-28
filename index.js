const express = require('express');
const app = express();

const http = require('http');
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})




io.on('connection', (socket) => {
    io.emit('connection', 'a user connected');
    socket.on('chat message', (msg)=> {
        io.emit('chat message', `From server:${msg}`)
    })
    socket.on('choose name', (name)=>{
        io.emit('new user', {nickname: name, text:'has joined the chat'})
    })
    
});
server.listen(3000, () => {
        console.log('listening on *:3000');
        });