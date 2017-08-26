
let gameState = {

  preload: function () {
    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/people/wiz_0.1.png')
    this.load.image('bady', 'assets/people/bady_0.1.png')
  },
  create: function () {
    this.background = this.game.add.sprite(0, 0, 'background')
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player')
    this.player.anchor.setTo(0.5, 0.5)

    this.bady = this.game.add.sprite(100, 100, 'bady')
    this.bady.anchor.setTo(0.5, 0.5)
  },
  update: function () {

  }
}

const game = new Phaser.Game(500, 500, Phaser.AUTO)

game.state.add('gameState', gameState)
game.state.start('gameState')























bs
