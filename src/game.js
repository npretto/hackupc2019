class Game {
  static FPS = 30
  static ENEMY_SPEED = 20 * (1 / Game.FPS)
  static PLAYER_SPEED = 80 * (1 / Game.FPS)

  constructor() {
    this.players = {}
    this.enemies = {}
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
      console.log(Game.PLAYER_SPEED)
      p.x += p.direction * Game.PLAYER_SPEED
    })

    Object.entries(this.enemies).forEach(([id, e]) => {
      e.y += Game.ENEMY_SPEED
    })

    return { players: this.players, enemies: this.enemies }
  }

  addEnemy() {
    const id = uuidv4()
    this.enemies[id] = { x: 20 + Math.random() * (800 - 40), y: 0 }
    return id
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
