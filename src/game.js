class Game {
  static FPS = 30
  static ENEMY_SPEED = 20 * (1 / Game.FPS)
  static PLAYER_SPEED = 80 * (1 / Game.FPS)

  constructor() {
    this.players = {}
    this.enemies = {}
  }

  addPlayer() {
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
