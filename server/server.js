const path = require('path');
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socket(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User connected');

    socket.on('createMsg', (msg) => {
        console.log('msg created', msg);
    });

    socket.emit('newMsg',{
        to:'c@gm.com',
        text:''
    });

    socket.on('disconnect', (socket) => {
        console.log("Disconnected from client");
    });
});




server.listen(port,()=>{
    console.log(`Starting at the post ${port}`);
});
