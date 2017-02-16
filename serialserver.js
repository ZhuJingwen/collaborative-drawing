var SerialPort = require('serialport');
var socket = require('socket.io-client')('http://localhost:8080');

var mySerialPort = new SerialPort('/dev/cu.usbmodemFA131', { //paste your port path here
  parser: SerialPort.parsers.readline('\n')
});

mySerialPort.on('data', function (data) {
  console.log('data: ' + data);
  socket.emit('data',data);
});
