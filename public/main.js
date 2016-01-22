var socket = io.connect(); 
// var socket = io.connect('http://localhost:8080/');

socket.on('connect', function() {
  console.log("Connected");
});

socket.on('new stroke', function(data) {
  drawOther(data.x, data.y, data.h, data.r);
});

var sendSelf = function(xval, yval, hval, rval) {
  drawSelf(xval, yval, hval, rval);
  socket.emit('new stroke', {
    x: xval,
    y: yval,
    h: hval,
    r: rval
  });
};

var initR, initH;
var initS = 70;
var initB = 90;

function setup() {
  var canvasContainer = document.getElementById("canvasContainer");
  var myCanvas = createCanvas((windowWidth - 100), (windowHeight - 100));
  myCanvas.parent(canvasContainer);
  colorMode(HSB, 100);
  background(70, 45, 30);

  //generate random color and radius
  initH = random(100);
  initR = random(10, 40);

}

function mouseDragged() {
  console.log(mouseX + "," + mouseY);
  sendSelf(mouseX, mouseY, initH, initR);
}

function draw() {

};

function drawSelf(xval, yval, hval, rval) {
  colorMode(HSB, 100);
  fill(hval, initS, initB);
  noStroke();
  ellipse(xval, yval, rval, rval);
}

function drawOther(xval, yval, hval, rval) {
  colorMode(HSB, 100);
  fill(hval, initS, initB);
  noStroke();
  ellipse(xval, yval, rval, rval);
}
