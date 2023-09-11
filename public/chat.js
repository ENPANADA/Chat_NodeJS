// Make connection
const PORT1 = process.env.PORT || 4000
var socket = io.connect('https://chatnodejs.up.railway.app/:'+PORT1);

// Query DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById("send");
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener("click", function(){
    console.log('Nuevo mensaje por enviar Handle:', message.value, ' Message:',handle.value);
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    output.innerHTML += '<p><strong>' + handle.value + ': </strong>' + message.value + '</p>';
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
