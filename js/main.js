var canvas = document.querySelector("#myCanvas")
var ctx = canvas.getContext("2d")
var color = "black";
var lineWidth = "6";
resize();

window.addEventListener("resize", function(event) {
  resize()

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
  drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, color, lineWidth)
  lastPoint = newPoint
})
canvas.addEventListener("mouseup", function(event) {
  mouseDown = false;
})




function resize() {
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
}


function drawLine(startX, startY, endX, endY, color, lineWidth) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.closePath();
  ctx.stroke()
  ctx.closePath()
}