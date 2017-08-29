var total = 0
let gameState = {

  preload: function () {
    //my assets
    this.load.image('background', 'assets/wizBizBackG.png')
    this.load.image('player', 'assets/people/wiz_0.1.png')
    this.load.image('bady', 'assets/people/bady_0.1.png')
  },

  create: function () {

    //the world
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.setBounds(0, 0, 1500, 1500)
    game.add.tileSprite(0, 0, 1500, 1500, 'background')

    //this is you
    this.player = game.add.sprite(300, 300, 'player')
    game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true
    this.player.anchor.setTo(0.5, 0.5)
    game.camera.follow(this.player)

    badyCreation();
    this.bady = game.add.sprite(game.world.randomX, game.world.randomY, 'bady')
    this.bady.anchor.setTo(0.5, 0.5)
    game.physics.arcade.enable(this.bady)

  },

  update: function () {

    //player movement
    this.player.rotation = game.physics.arcade.angleToPointer(this.player) + 1.57079633
    //bady movement
    if(this.player.x && this.player.y !== this.bady.x && this.bady.y){
       this.bady.rotation = game.physics.arcade.angleBetween(this.bady, this.player) + 1.57079633
       game.physics.arcade.moveToObject(this.bady, this.player, 100)
    }

    //player controls
    if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
      this.player.x -= 4
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
      this.player.x += 4
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
      this.player.y -= 4
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
      this.player.y += 4
    }

    blah()

  }
}

function badyCreation(){
  this.bady = game.add.sprite(game.world.randomX, game.world.randomY, 'bady')
  this.bady.anchor.setTo(0.5, 0.5)
  game.physics.arcade.enable(this.bady)

  total++;
  timer = game.time.now + 100;

}

function blah (){
  if(total < 200 && game.time.now > timer)
    {
        badyCreation();
    }
}

// var playerControls = function (){
//   if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
//     this.player.x -= 4
//   }
//   else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
//     this.player.x += 4
//   }
//   if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
//     this.player.y -= 4
//   }
//   else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
//     this.player.y += 4
//   }
// }

const game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv')

game.state.add('gameState', gameState)
game.state.start('gameState')






















bs
