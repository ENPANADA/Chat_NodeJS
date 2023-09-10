var express = require('express');
var socket = require('socket.io');
const port = 4000

// App setup
var app = express();
var server = app.listen(port, function(){
    console.log('listening for requests on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado, ID: ', socket.id);
    // Handle chat event
    io.on('chat', function(data){
        console.log(data.handle, 'envio el mensaje: ',data.message);
        io.emit('chat', data);
    });
    // Handle typing event
    io.on('typing', function(data){
        socket.emit('typing', data);
    });

});
