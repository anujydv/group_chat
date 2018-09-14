const path = require('path');
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socket(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User connected');

    socket.emit('newMsg',generateMessage('admin','welcom to the chat app'));

    socket.broadcast.emit('newMsg',generateMessage('admin', 'welcom to the chat app'));

    socket.on('createMsg', (msg,callback) => {
        console.log('msg created', msg);
        io.emit('newMsg',generateMessage(msg.from,msg.text))
        callback('this is from server');
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMsg',generateLocationMessage('Admin',coords.lat ,coords.lon));
    });

    socket.on('disconnect', (socket) => {
        console.log("Disconnected from client");
    });
});

server.listen(port,()=>{
    console.log(`Starting at the post ${port}`);
});
