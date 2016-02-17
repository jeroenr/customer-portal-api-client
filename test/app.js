var socket = require('engine.io-client')('ws://alpha.fromamsterdamwithlove.net:5000?id="engineio"');
socket.on('open', function(){
  socket.on('message', function(data){
	console.log("Received message ", data);
});
  socket.on('close', function(){});
});
