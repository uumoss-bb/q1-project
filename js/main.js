
let gameState = {

  preload: function () {
    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/people/wiz_0.1.png')
    this.load.image('bady', 'assets/people/bady_0.1.png')
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    this.background = this.game.add.sprite(0, 0, 'background')
    //background color for checking the size
    this.stage.backgroundColor = "#4488AA"
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //this is you
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player')
    this.player.anchor.setTo(0.5, 0.5)
    //this is the bady
    this.bady = this.game.add.sprite(250, 100, 'bady')
    this.bady.anchor.setTo(0.5, 0.5)
    this.bady.scale.setTo(1, -1) //this flips on Y axis
  },

  update: function () {

  }
}

let playerState = {

}

const game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv')

game.state.add('gameState', gameState)
game.state.start('gameState')























bs
