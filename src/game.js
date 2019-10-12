class Game {
  constructor() {
    this.players = {}
  }

  addPlayer() {
    console.log("adding new player")
    const id = uuidv4()
    this.players[id] = { x: 100 + Math.random() * 200, direction: 0 }
    return id
  }

  removePlayer(id) {
    delete this.players[id]
  }

  setPlayerMov(id, dir) {
    this.players[id].direction = dir
  }

  update() {
    Object.entries(this.players).forEach(([id, p]) => {
      console.log(p, p.direction)
      p.x += p.direction
    })

    return { players: this.players }
  }
}

module.exports.Game = Game

// https://stackoverflow.com/a/2117523/2670415
https: function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
