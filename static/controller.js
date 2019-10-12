let direction = 0
var socket = io("/controllers")

function setleft() {
  direction = -1
  send()
}
function setright() {
  direction = 1
  send()
}
function setnull() {
  direction = 0
  send()
}

function send() {
  socket.emit("direction", direction)
}

document.querySelector("#left").addEventListener("mousedown", setleft)
document.querySelector("#left").addEventListener("mouseup", setnull)
document.querySelector("#right").addEventListener("mousedown", setright)
document.querySelector("#right").addEventListener("mouseup", setnull)

document.querySelector("#left").addEventListener("touchstart", setleft)
document.querySelector("#left").addEventListener("touchend", setnull)
document.querySelector("#right").addEventListener("touchstart", setright)
document.querySelector("#right").addEventListener("touchend", setnull)
