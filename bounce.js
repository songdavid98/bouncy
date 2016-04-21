console.log("hello, david");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var startbutton = document.getElementById("start");
var stopbutton = document.getElementById("stop");

var frameid = 0;

var run = function(e) {
    context.clearRect(0, 0, canvas.width, canvas.height);  
    console.log("clear");             
    
    for (var i = 0; i < allObjects.length; i++) {
	allObjects[i].move();
	allObjects[i].drawRect();
    }
    //for (object in allObjects) {
	//console.log(object);
	//move();
	//drawRect();
    //};
    //first.move();
    //first.drawRect();
    frameid = window.requestAnimationFrame(run);
};

var start = function() {
    stop();
    console.log("started");
    run();
}
var stop = function() {
    window.cancelAnimationFrame(frameid);
}
startbutton.addEventListener('click', start);
stopbutton.addEventListener('click', stop);

var makeBouncers = function() {
    var rectW = 50;
    var rectH = 20;
    var rectX = Math.floor((Math.random() * canvas.width));
    var rectY = Math.floor((Math.random() * canvas.height));
    var xdir = 1;
    var ydir = 1;

    var move = function() {
	if (rectX <= 0 || rectX >= canvas.width - rectW) {
	    xdir *= -1;
	}
	if (rectY <= 0 || rectY >= canvas.height - rectH) {
	    ydir *= -1;
	}
	
	rectX += xdir;
	rectY += ydir;
    };
    
    var drawRect = function(e) { 
	context.beginPath();
	context.fillRect(rectX, rectY, rectW, rectH);
    };
    
    return {
	move: move,
	drawRect: drawRect
    };
};

var first = makeBouncers();
var second = makeBouncers();
var third = makeBouncers();
var fourth = makeBouncers();
var allObjects = [first, second, third, fourth];
