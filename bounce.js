var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var startbutton = document.getElementById("start");
var stopbutton = document.getElementById("stop");
var clearbutton = document.getElementById("clear");
var addbutton = document.getElementById("add");
var running = false;

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
    frameid = window.requestAnimationFrame(run);
};

var start = function() {
    running = true;
    stop();
    console.log("started");
    run();
};
var stop = function() {
    running = false;
    window.cancelAnimationFrame(frameid);
};

startbutton.addEventListener('click', start);
stopbutton.addEventListener('click', stop);

var makeBouncers = function() {
    var radius = 15;
    var posX = Math.floor((Math.random() * (canvas.width-2*radius) + radius));
    var posY = Math.floor((Math.random() * (canvas.height-2*radius) + radius));
    var xdir = 1;
    var ydir = 1;

    var move = function() {
	if (posX - radius <= 0 || posX >= canvas.width - radius) {
	    xdir *= -1;
	}
	if (posY - radius <= 0 || posY >= canvas.height - radius) {
	    ydir *= -1;
	}
	
	posX += xdir;
	posY += ydir;
    };
    
    var drawRect = function(e) { 
	context.beginPath();
	context.arc(posX, posY, radius, 0, 2*Math.PI);
	context.fill();
    };
    
    return {
	move: move,
	drawRect: drawRect
    };
};


var first = makeBouncers();
var allObjects = [first];

var addBall = function(){
    var newBall = makeBouncers();
    allObjects.push(newBall);
    //console.log("added");
    if (running){
	start();
    }
    else if (!running){
	newBall.drawRect();
    }
};


var clear = function(){
    stop();
    context.clearRect(0, 0, canvas.width, canvas.height);  
    allObjects = [first];
};

addbutton.addEventListener('click',addBall);
clearbutton.addEventListener("click",clear);
