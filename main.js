var div = document.getElementById("canvas");
var context = div.getContext("2d");
var lineWidth = 3;
var clearWidth = 10;

autoCanvasSize(div);
listenToUser(div);

var eraserEnabled = false;
pen.onclick = function() {
  eraserEnabled = false;
  pen.classList.add("active");
  eraser.classList.remove("active");
  black.classList.add("active");
  small.classList.add("active");
  lineWidth = 3;
  clearWidth = 10;
  medium.classList.remove("active");
  large.classList.remove("active");
};
eraser.onclick = function() {
  eraserEnabled = true;
  eraser.classList.add("active");
  pen.classList.remove("active");
  black.classList.remove("active");
  red.classList.remove("active");
  yellow.classList.remove("active");
  blue.classList.remove("active");
  small.classList.add("active");
  lineWidth = 3;
  clearWidth = 10;
  medium.classList.remove("active");
  large.classList.remove("active");
};
clear.onclick = function() {
  context.fillStyle = "white";
  context.fillRect(0, 0, div.width, div.height);
};
download.onclick = function() {
  var url = div.toDataURL("image/png");
  var image = document.createElement("a");
  document.body.appendChild(image);
  image.href = url;
  image.download = "image";
  image.click();
};

black.onclick = function() {
  context.fillStyle = "black";
  context.strokeStyle = "black";
  black.classList.add("active");
  red.classList.remove("active");
  yellow.classList.remove("active");
  blue.classList.remove("active");
};
red.onclick = function() {
  context.fillStyle = "red";
  context.strokeStyle = "red";
  black.classList.remove("active");
  red.classList.add("active");
  yellow.classList.remove("active");
  blue.classList.remove("active");
};
yellow.onclick = function() {
  context.fillStyle = "yellow";
  context.strokeStyle = "yellow";
  black.classList.remove("active");
  red.classList.remove("active");
  yellow.classList.add("active");
  blue.classList.remove("active");
};
blue.onclick = function() {
  context.fillStyle = "blue";
  context.strokeStyle = "blue";
  black.classList.remove("active");
  red.classList.remove("active");
  yellow.classList.remove("active");
  blue.classList.add("active");
};
small.onclick = function() {
  lineWidth = 3;
  clearWidth = 10;
  small.classList.add("active");
  medium.classList.remove("active");
  large.classList.remove("active");
};
medium.onclick = function() {
  lineWidth = 6;
  clearWidth = 20;
  small.classList.remove("active");
  medium.classList.add("active");
  large.classList.remove("active");
};
large.onclick = function() {
  lineWidth = 10;
  clearWidth = 30;
  small.classList.remove("active");
  medium.classList.remove("active");
  large.classList.add("active");
};

function autoCanvasSize(canvas) {
  setCanvasSize();
  window.onresize = function() {
    setCanvasSize();
  };
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
function listenToUser(canvas) {
  //给画板初始白色背景
  context.fillStyle = "white";
  context.fillRect(0, 0, div.width, div.height);

  var leftOnClick = false;
  var lastPoint = { x: undefined, y: undefined };
  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    //触摸开始
    canvas.ontouchstart = function(down) {
      var x = down.touches[0].clientX;
      var y = down.touches[0].clientY;
      leftOnClick = true;
      if (eraserEnabled) {
        context.clearRect(
          x - clearWidth / 2,
          y - clearWidth / 2,
          clearWidth,
          clearWidth
        );
      } else {
        lastPoint = { x: x, y: y };
      }
    };
    //触摸移动
    canvas.ontouchmove = function(move) {
      var x = move.touches[0].clientX;
      var y = move.touches[0].clientY;
      if (!leftOnClick) {
        return;
      } else {
        if (eraserEnabled) {
          context.clearRect(
            x - clearWidth / 2,
            y - clearWidth / 2,
            clearWidth,
            clearWidth
          );
        } else {
          var newPoint = { x: x, y: y };
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          lastPoint = newPoint;
        }
      }
    };
    //触摸结束
    canvas.omtouchend = function(up) {
      leftOnClick = false;
    };
  } else {
    //非触屏设备
    //鼠标按下
    canvas.onmousedown = function(down) {
      var x = down.clientX;
      var y = down.clientY;
      leftOnClick = true;
      if (eraserEnabled) {
        context.clearRect(
          x - clearWidth / 2,
          y - clearWidth / 2,
          clearWidth,
          clearWidth
        );
      } else {
        lastPoint = { x: x, y: y };
      }
    };
    //鼠标移动
    canvas.onmousemove = function(move) {
      var x = move.clientX;
      var y = move.clientY;
      if (!leftOnClick) {
        return;
      } else {
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          var newPoint = { x: x, y: y };
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          lastPoint = newPoint;
        }
      }
    };
    //鼠标松开
    canvas.onmouseup = function(up) {
      leftOnClick = false;
    };
  }
}

function drawCircle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}
function drawLine(x1, y1, x2, y2) {
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineWidth = lineWidth;
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
