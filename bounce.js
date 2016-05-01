var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var startbutton = document.getElementById("start");
var stopbutton = document.getElementById("stop");
var clearbutton = document.getElementById("clear");
var addbutton = document.getElementById("add");
var flockbutton = document.getElementById("flock");
var filterbutton = document.getElementById("filter");
var dispersebutton = document.getElementById("disperse");

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
    var radius = (Math.random() * 20 +15);
    var posX = Math.floor((Math.random() * (canvas.width-2*radius) + radius));
    var posY = Math.floor((Math.random() * (canvas.height-2*radius) + radius));
    var xdir = (Math.random() * 3 - 1);
    var ydir = (Math.random() * 3 - 1);

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

    var setSpeed = function(x, y) {
	xdir = x;
	ydir = y;
    };

    var getRadius = function() {
	return radius;
    };
    
    return {
	move: move,
	drawRect: drawRect,
	setSpeed: setSpeed,
	getRadius: getRadius
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

var flock = function() {
    console.log("flock");
    allObjects.map(function (object) {
	object.setSpeed(1,1);
    });
};

var filterLarge = function() {
    //console.log("filter");
    allObjects.filter(function(object){
	return object.getRadius() > 25;
    }).map(function(object){
	object.setSpeed(0,0);
    });
};

var disperse = function() {
    allObjects.map(function(object){
	var randX = (Math.random() * 3 - 1);
	var randY = (Math.random() * 3 - 1);
	object.setSpeed(randX,randY);
    });
};

addbutton.addEventListener('click',addBall);
clearbutton.addEventListener("click",clear)
flockbutton.addEventListener("click",flock);
filterbutton.addEventListener("click",filterLarge);
dispersebutton.addEventListener("click",disperse);

