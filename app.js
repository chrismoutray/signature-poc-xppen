var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

function mousemove(e) {
    
    ctx.lineTo((e.pageX / screen.width * canvas.width), (e.pageY / screen.height * canvas.height));
	ctx.stroke();
}

var drawing = false;
document.addEventListener('mousedown', function (e) {
    ctx.beginPath();
    ctx.moveTo((e.pageX / screen.width * canvas.width), (e.pageY / screen.height * canvas.height));
    drawing = true;
}, false);
document.addEventListener('mousemove', function (e) {
    //console.log((e.screenX / e.pageX * canvas.width), (e.screenY / e.pageY * canvas.height));
    console.log(e.pageX, screen.width, canvas.width, (e.pageX / screen.width * canvas.width));
    if (drawing) mousemove(e);
}, false);
document.addEventListener('mouseup', function (e) {
    mousemove(e);
    drawing = false
}, false);

// helper function

const RADIUS = 10;

function degToRad(degrees) {
  var result = Math.PI / 180 * degrees;
  return result;
}

// setup of the canvas



var x = 50;
var y = 50;

// function canvasDraw() {
//    ctx.fillStyle = "black";
//    ctx.fillRect(0, 0, canvas.width, canvas.height);
//    ctx.fillStyle = "#f00";
//    ctx.beginPath();
//    ctx.arc(x, y, RADIUS, 0, degToRad(360), true);
//    ctx.fill();
// }
// canvasDraw();

// pointer lock object forking for cross browser

canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

canvas.onclick = function() {
    canvas.requestPointerLock();
};

// pointer lock event listeners

// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", updatePosition, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", updatePosition, false);
  }
}

var tracker = document.getElementById('tracker');

var animation;
function updatePosition(e) {

  x += e.movementX;
  y += e.movementY;
  console.log('---------------', x, e.offsetX, e);
  if (x > canvas.width + RADIUS) {
    x = -RADIUS;
  }
  if (y > canvas.height + RADIUS) {
    y = -RADIUS;
  }  
  if (x < -RADIUS) {
    x = canvas.width + RADIUS;
  }
  if (y < -RADIUS) {
    y = canvas.height + RADIUS;
  }
  tracker.textContent = "X position: " + x + ", Y position: " + y;

  if (!animation) {
    animation = requestAnimationFrame(function() {
      animation = null;
      canvasDraw();
    });
  }
}