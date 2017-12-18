var socket;
var blob;
var id;

var blobs = [];
var zoom = 1;

function setup() {
    createCanvas(600, 600);
    socket = io.connect('http://localhost:3000');
    
    blob = new Blob(random(width/2), random(height/2), random(8,24));

    //sending data
    var data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    }
    socket.emit('start',data);

    socket.on('heartbeat', function(data) {
        blobs = data;
    }); 
}

function draw() {
    background(0);

    translate(width / 2, height / 2);
    var newzoom = 64 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    for (var i = blobs.length - 1; i >= 0; i--) {
        var id = blobs[i].id;
        if(id !== socket.id) {
            fill(150,80,255);
            ellipse(blobs[i].x,blobs[i].y,blobs[i].r*2,blobs[i].r*2);
        
            fill(255);
            textAlign(CENTER);
            textSize(4);
            text(blobs[i].id,blobs[i].x,blobs[i].y+blobs[i].r);
        }
        // blobs[i].show();
        // if (blob.eats(blobs[i])) {
        //     blobs.splice(i, 1);
        // }
    }

    blob.show();
    if (mouseIsPressed) {
        blob.update();
        console.log(blob.pos.x,blob.pos.y);
    }
    blob.constrain();

    var data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    }
    socket.emit('update',data);
}