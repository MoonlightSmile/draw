var canvas = document.querySelector("#myCanvas")
var eraser = document.querySelector("#a")
var userColor = document.querySelector("#color")
var ctx = canvas.getContext("2d")
var color = userColor;
var penSize = "1";
var eraserSize = "100"
var lock = false
resize();
userColor.addEventListener("blur", function() {
  color = this.value;

})


window.addEventListener("resize", function(event) {
  resize()

})
eraser.addEventListener("click", function(event) {
  lock = !lock;
  this.style.backgroundColor = lock?"red":""
})

var mouseDown = false;
var lastPoint = {
  x: undefined,
  y: undefined
}
var newPoint = {
  x: undefined,
  y: undefined
}
canvas.addEventListener("mousedown", function(event) {
  console.log(canvas.offsetLeft)

  mouseDown = true;
  if (!mouseDown) return
  lastPoint = {
    x: event.clientX,
    y: event.clientY
  }
})
canvas.addEventListener("mousemove", function(event) {
  if (!mouseDown) return
  newPoint = {
    x: event.clientX,
    y: event.clientY
  }
  if (lock) {
    drawLine(lastPoint, newPoint, "white", eraserSize)
  } else {
    drawLine(lastPoint, newPoint, color, penSize)
  }
  lastPoint = newPoint
})
canvas.addEventListener("mouseup", function(event) {
  mouseDown = false;
})
canvas.addEventListener("mouseleave", function(event) {
  mouseDown = false;
})





function resize() {

  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
}


function drawLine(lastPoint, newPoint, color, lineWidth) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(newPoint.x, newPoint.y);
  ctx.closePath();
  ctx.stroke()
  ctx.closePath()
}