'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var globalMessage = '';
var userCount = 0;

// Middleware
app.use(express.static('public'));

io.on('connection', function(socket){
    userCount++;
    io.emit('updatedMessage', { message: globalMessage });
    io.emit('userCount', { message: userCount });
    console.log('User Count: ', userCount);

    socket.on('updatedMessage', function(msg){
        globalMessage = msg;
        console.log('message: ' + msg);
        io.emit('updatedMessage', { message: globalMessage });

    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
        userCount--;
        io.emit('userCount', { message: userCount });
        console.log('User Count: ', userCount);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});