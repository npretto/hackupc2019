const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const path = require('path')
// const Game = require("./src/game.js").Game
// const game = new Game()

app.use(express.static(path.join(__dirname, 'static')))

const screenSocket = io.of("/screen")

io.of("/controllers").on("connection", function(socket) {
  const id = uuidv4()
  screenSocket.emit("player-connection", id)
  console.log("controller connected")
  socket.on("direction", direction => {
    console.log("controller direction")

    screenSocket.emit("direction", { id, direction })
  })
  socket.on("disconnect", socket => {
    screenSocket.emit("player-disconnect", id)
  })
})

http.listen(3000, function() {
  console.log("listening on *:3000")
})

// https://stackoverflow.com/a/2117523/2670415
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
