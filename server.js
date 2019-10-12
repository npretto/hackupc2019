const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const Game = require("./src/game.js").Game
const game = new Game()

app.get("/", (req, res) => res.sendFile(__dirname + "/static/index.html"))
app.get("/controller", (req, res) =>
  res.sendFile(__dirname + "/static/controller.html")
)

const screenSocket = io.of("/screen")

io.of("/controllers").on("connection", function(socket) {
  const id = game.addPlayer()
  screenSocket.emit("player-connection", id)

  socket.on("direction", msg => {
    game.setPlayerMov(id, msg)
  })
  socket.on("disconnect", socket => {
    game.removePlayer(id)
    screenSocket.emit("player-disconnect", id)

    console.log(`player ${id} disconnected`)
  })
})

http.listen(3000, function() {
  console.log("listening on *:3000")
  setInterval(() => {
    const data = game.update()
    // console.log(data)
    screenSocket.emit("update", data)
  }, 1000 / Game.FPS)

  setInterval(() => {
    const id = game.addEnemy()
    screenSocket.emit("add-enemy", id)
  }, 1000)
})
