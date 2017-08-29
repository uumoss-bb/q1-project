var total = 0
var mob = []
var weapon
let gameState = {

  preload: function () {
    //my assets
    this.load.image('background', 'assets/wizBizBackG.png')
    this.load.image('player', 'assets/people/wiz_0.1.png')
    this.load.image('bady', 'assets/people/bady_0.1.png')
    this.load.image('fireBall', 'assets/fireBall.png')
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

    // //fireBall
    // this.fireBall = game.add.sprite(30, 'fireBall')
    // // this kills the bullet when it leaves the bounds
    // this.fireBall.bulletKillType = Phaser.This.FireBall.KILL_WORLD_BOUNDS
    // this.fireBall.bulletSpeed = 600;
    // this.fireBall.fireRate = 100;
    // this.fireBall.trackSprite(this.player, 0, 0, true);

  },

  update: function () {

    //player movement
    this.player.rotation = game.physics.arcade.angleToPointer(this.player) + 1.57079633
    //bady movement
    if(this.player.x && this.player.y !== this.bady.x && this.bady.y){
       this.bady.rotation = game.physics.arcade.angleBetween(this.bady, this.player) + 1.57079633
       game.physics.arcade.moveToObject(this.bady, this.player, 100)
    }

    for (let a = 0; a < mob.length; a++) {
      mob[a].anchor.setTo(0.5, 0.5)
      game.physics.arcade.enable(mob[a])
      mob[a].rotation = game.physics.arcade.angleBetween(mob[a], this.player) + 1.57079633
       game.physics.arcade.moveToObject(mob[a], this.player, 100)

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

    //bady spawner
    if(total < 200 && game.time.now > timer){
      badyCreation();
    }

    //shooting fireBall
    // if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    //   this.fireBall.fire()
    // }

  }
}

function badyCreation(){
  this.bady = game.add.sprite(game.world.randomX, game.world.randomY, 'bady')
  mob.push(this.bady)

  total++;
  timer = game.time.now + 100;

}

// fire:  function () {
//     if (this.shipSprite.visible) {
//
//     if (game.time.now > this.bulletInterval) {
//       this.sndFire.play();
//
//         var bullet = this.bulletGroup.getFirstExists(false);
// 
//         if (bullet) {
//             var length = this.shipSprite.width * 0.9;
//             var x = this.shipSprite.x + (Math.cos(this.shipSprite.rotation) * length);
//             var y = this.shipSprite.y + (Math.sin(this.shipSprite.rotation) * length);
//
//             bullet.reset(x, y);
//             bullet.lifespan = bulletProperties.lifeSpan;
//             bullet.rotation = this.shipSprite.rotation;
//
//             game.physics.arcade.velocityFromRotation( (this.shipSprite.rotation + bulletProperties.scatter[Math.floor(Math.random()*bulletProperties.scatter.length)]) , bulletProperties.speed, bullet.body.velocity);
//             this.bulletInterval = game.time.now + bulletProperties.interval;
//         }
//     }
//
//     }
// }


const game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv')

game.state.add('gameState', gameState)
game.state.start('gameState')






















bs
