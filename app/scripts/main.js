
active_users = [];

function connect(id, token){
	window.primus = Primus.connect('https://somewhere.com?auth_key=yCWtxseZTgN1WN7kniFL&access_token=' + token + '&auth_id=2&user_id=' + id,{ path: "/savvy"});

	window.primus.on('open', function() {
	  	console.log("Opened connection");

	  	window.primus.send('listusers', function(users){
	  		console.log("Got user resp: ", users);
			$('#userContainer').html("<ul id='users'></ul>"); 
			active_users = [];
			$.each(users, function(i){
				var u = users[i];
				active_users.push(u.id);
				$('#users').append("<li>" + u.id + " is " + u.status + " </li>");
			});
		});
	});

	window.primus.on('message', function(msg, fn){
  		console.log("Received msg bla: ", msg.message);
  		$('#msgbox').append(JSON.stringify(msg) + " </br>");
  		fn && fn(msg.id);
  	});
}

function joinRoom(room){
	window.primus.send('join', room, function(data){
  		console.log("Received ack and got data: ", data);
  	});
}

function sendMsg(msg, room) {
	console.log("Sending message");
	if(!!room){
		window.primus.send('msgtoroom', {message: msg, room: room}, function(delivered){
		  	console.log("Message delivered: ", delivered);
		});
	} else {
		window.primus.send('msgtousers', {message: msg, recipients: active_users}, function(delivered){
		  	console.log("Message delivered: ", delivered);
		});
	}
}

function listUsers() {

}
