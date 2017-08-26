
let gameState = {

  preload: function () {
    this.load.image('background', 'assets/background.jpg')
    this.load.image('player', 'assets/people/wizc.gif')
  },
  create: function () {
    this.background = this.game.add.sprite(0, 0, 'background')
    this.player = this.game.add.sprite(0, 0, 'player')
  },
  update: function () {

  }
}

const game = new Phaser.Game(800, 800, Phaser.AUTO)

game.state.add('gameState', gameState)
game.state.start('gameState')























bs
