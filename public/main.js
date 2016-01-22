var socket = io.connect();
// var socket = io.connect('http://localhost:8080/');

socket.on('connect', function() {
  console.log("Connected");
});

socket.on('new stroke', function(data) {
  drawStroke(data.x, data.y, data.h, data.r);
});

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
  //console.log(mouseX + "," + mouseY);
  drawStroke(mouseX, mouseY, initH, initR);
  sendSelf(mouseX, mouseY, initH, initR);
}

function drawStroke(xval, yval, hval, rval) {
  fill(hval, initS, initB);
  noStroke();
  ellipse(xval, yval, rval, rval);
}

function sendSelf(xval, yval, hval, rval) {
  socket.emit('new stroke', {
    x: xval,
    y: yval,
    h: hval,
    r: rval
  });
};
