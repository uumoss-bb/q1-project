
var gameMenu = {

  preload: function () {

    this.load.image('playBtn', 'assets/play_btn.png')

  },
  create: function () {

    game.stage.backgroundColor = "#23363A"

    var gameTite = game.add.text(500, 200, 'Wiz Biz', {font: '170px Palatino', fill: "#8F3359"})
    gameTite.anchor.setTo(0.5, 0.5)
    gameTite.setShadow(3, 3, 'rgba(0,0,0,0.3)', 5)

    var infoText = game.add.text(500, 520, 'W,A,S,D to move - Left click to shoot - Use pointer to aim', {font: '30px Palatino', fill: "#8F3359"})
    infoText.anchor.setTo(0.5, 0.5)
    infoText.setShadow(3, 3, 'rgba(0,0,0,0.3)', 5)

    var button = game.add.button(500, 400, 'playBtn', actionOnClick, this, 2, 1, 0)
    button.anchor.setTo(0.5, 0.5)

  }
}

function actionOnClick (){
  game.state.add('gameState', gameState)
  game.state.start('gameState')
}


const game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv')

game.state.add('gameMenu', gameMenu)
game.state.start('gameMenu')
