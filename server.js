var blobs = [];

function Blob(id,x,y,r) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.r = r;
}

var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

setInterval(heartbeat,33);
function heartbeat() {
	io.sockets.emit('heartbeat',blobs);
}


io.sockets.on('connection', newConnection);

var isStart = false;
function newConnection(socket) {
	console.log('new connection: ' + socket.id);


	
	socket.on('start',function(data) {
		// socket.broadcast.emit('start', data);
		console.log(socket.id +" "+data.x + " "+data.y+" "+data.r);
		var blob = new Blob(socket.id,0,0);
		blobs.push(blob);

		isStart = true;
	});

	// if (isStart) {
		socket.on('update',function(data) {
			// console.log(socket.id +" "+data.x + " "+data.y+" "+data.r);
			var blob;
			// console.log("size: " + blobs.length);
			for(var i=0;i<blobs.length;i++) {
				if(socket.id == blobs[i].id) {
					blob = blobs[i];
				}
			}
			blob.x = data.x;
			blob.y = data.y;
			blob.r = data.r;
		});
	// }
}