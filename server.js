const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const Game = require("./src/game.js").Game
const game = new Game()

app.get("/", (req, res) => res.sendFile(__dirname + "/static/index.html"))
app.get("/controller", (req, res) =>
  res.sendFile(__dirname + "/static/controller.html")
)

io.of("/controllers").on("connection", function(socket) {
  const id = game.addPlayer()
  socket.on("direction", msg => {
    game.setPlayerMov(id, msg)
  })
  socket.on("disconnect", socket => {
    game.removePlayer(id)
    console.log(`player ${id} disconnected`)
  })
})

//screens
const screenSocker = io.of("/screen")

http.listen(3000, function() {
  console.log("listening on *:3000")
  setInterval(() => {
    console.log("--")
    const data = game.update()
    screenSocker.emit("update", data)
  }, 1000 / 30)
})
