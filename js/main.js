//获取操作 dom
var canvas = document.querySelector("#myCanvas")
var ctx = canvas.getContext("2d")
var svg = document.querySelectorAll("svg")
var colors = document.querySelectorAll("ol.color li")
var tool = document.querySelector(".tool")
var colorOl = document.querySelector(".color")

//初始化用户数据
var color = "black"
var penSize = "7"
var eraserSize = "20"
var eraserEnabled = false
autoSetCanvasSize();
//添加取色
for (var i = 0; i < colors.length; i++) {
  colors[i].addEventListener("click", function() {
    for (var i = 0; i < colors.length; i++) {
      colors[i].classList.remove("active")
    }
    this.classList.add("active")
    color = this.getAttribute("color")
  })
}
svg[0].addEventListener("click", function() {
  colorOl.classList.toggle("hover")
})


svg[0].onclick = function() {
  eraserEnabled = false;
  for (var i = 0; i < svg.length; i++) {
    svg[i].classList.remove("active")
  }
  this.classList.add("active");
}
svg[1].onclick = function() {
  eraserEnabled = true;
  for (var i = 0; i < svg.length; i++) {
    svg[i].classList.remove("active")
  }
  this.classList.add("active");
}
svg[2].onclick = function() {
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  ctx.clearRect(0, 0, pageWidth, pageHeight)
}
svg[3].onclick = function() {

}



var isDraw = false;
var lastPoint = {
  x: undefined,
  y: undefined
}
var newPoint = {
  x: undefined,
  y: undefined
}

//监听 pc 端事件
canvas.addEventListener("mousedown", function(event) {
  colorOl.classList.remove("hover")
  isDraw = true;
  if (!isDraw) return
  lastPoint = {
    x: event.clientX,
    y: event.clientY
  }
})
canvas.addEventListener("mousemove", function(event) {
  if (!isDraw) return
  newPoint = {
    x: event.clientX,
    y: event.clientY
  }
  if (eraserEnabled) {
    drawLine(lastPoint, newPoint, "white", eraserSize)
  } else {
    drawCircle(newPoint, penSize / 2)
    drawLine(lastPoint, newPoint, color, penSize)
  }
  lastPoint = newPoint
})
canvas.addEventListener("mouseup", function(event) {
  isDraw = false;
})
canvas.addEventListener("mouseleave", function(event) {
  isDraw = false;
})


//监听移动端事件
canvas.addEventListener("touchstart", function(event) {
  colorOl.classList.remove("hover")
  isDraw = true;
  if (!isDraw) return
  lastPoint = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY
  }
})
canvas.addEventListener("touchmove", function(event) {
  if (!isDraw) return
  newPoint = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY
  }
  if (eraserEnabled) {
    drawLine(lastPoint, newPoint, "white", eraserSize)
  } else {
    // drawCircle(lastPoint, penSize / 2)
    drawLine(lastPoint, newPoint, color, penSize)
  }
  lastPoint = newPoint
})
canvas.addEventListener("touchend", function(e) {
  isDraw = false;
})
//canvas适应屏幕
function setCanvasSize() {
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight

  canvas.width = pageWidth
  canvas.height = pageHeight
}

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.addEventListener("resize", function() {
    setCanvasSize()
  })
}
//画圆
function drawCircle(point, radius) {
  ctx.beginPath();
  ctx.fillStyle = color
  ctx.arc(point.x, point.y, radius - 1, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}
//画线
function drawLine(lastPoint, newPoint, color, lineWidth) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(newPoint.x, newPoint.y);
  ctx.stroke()
  ctx.closePath();
}