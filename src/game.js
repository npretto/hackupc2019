class Game {
  constructor() {
    this.players = {}
  }

  addPlayer() {
    console.log("adding new player")
    const id = Object.keys(this.players).length
    this.players[id] = { pos: 100 + Math.random() * 200, direction: 0 }
    return id
  }

  removePlayer(id) {
    this.players[id] = null
  }

  setPlayerMov(id, dir) {
    console.log(id, dir)
    this.players[id].direction = dir
  }

  update() {
    return { players: this.players }
  }
}

module.exports.Game = Game
