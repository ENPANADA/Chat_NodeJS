var express = require('express');
var socket = require('socket.io');
const PORT = process.env.PORT || 4000

// App setup
var app = express();
var server = app.listen(PORT, function(){
    console.log('Escuchando por el puerto:', PORT);
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado, ID: ', socket.id);
    // Handle chat event
    socket.on('chat', function(data){
        console.log(data.handle, 'envio el mensaje: ',data.message);
        io.sockets.emit('chat', data);
    });
    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
