var player
var playerLife = 3
var bady
var el
var mob
var bullet
var bullets
var total = 0
var timer
var bulletTime = 0
var invincible = false

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
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player')
    game.physics.arcade.enable(player)
    player.body.collideWorldBounds = true
    player.anchor.setTo(0.5, 0.5)
    game.camera.follow(player)

    //the bad guys
    mob = game.add.group()
    mob.enableBody = true
    mob.physicsBodyType = Phaser.Physics.ARCADE

    badyCreation()
    mob.setAll('anchor.x', 0.5)
    mob.setAll('anchor.y', 0.5)

    // fireBall
    bullets = game.add.group()
    bullets.enableBody = true
    bullets.physicsBodyType = Phaser.Physics.ARCADE

    bullets.createMultiple(40, 'fireBall')
    bullets.setAll('anchor.x', 0.5)
    bullets.setAll('anchor.y', 0.5)

  },

  update: function () {
    //player movement
    player.rotation = game.physics.arcade.angleToPointer(player)

    mob.forEach(function(el){
      //bady movement
      el.anchor.setTo(.5,.5)
      game.physics.arcade.enable(el)
      el.rotation = game.physics.arcade.angleBetween(el, player) + 1.57079633
      game.physics.arcade.moveToObject(el, player, 100)

      bullets.forEach(function (bu){
        //this check to see if a bullet hit a bady
        game.physics.arcade.overlap(bu, el, badyDeath)
        if(invincible === false){
          //this check to see if a bady hit the player
          game.physics.arcade.overlap(player, el, wizDeath)
        }
        else {}

        function badyDeath (){
          el.kill()
          bu.kill()
        }
        function wizDeath (){

          playerLife -= 1
          player.kill()
          invincible = true

          if(playerLife > 0){
            player.reset(game.world.centerX, game.world.centerY)
            game.time.events.add(2000, () => invincible = false)
          }
          else{
            // game over, click to restart
          }
        }
      })
    })

    //player controls
    if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
      player.x -= 4
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
      player.x += 4
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
      player.y -= 4
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
      player.y += 4
    }

    //bady spawner
    if(total < 1000 && game.time.now > timer){
      badyCreation()
    }

    // shooting fireBall
    if(game.input.activePointer.isDown){
      fireBullet()
      var theIF = true
    }

  }
}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false)

        if (bullet)
        {
            bullet.reset(player.x + 16, player.y + 16)
            bullet.lifespan = 2000
            bullet.rotation = player.rotation
            game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity)
            bulletTime = game.time.now + 120
        }
    }
}

function badyCreation(){
  mob.add(game.add.sprite(game.world.randomX, game.world.randomY, 'bady'))

  total++
  timer = game.time.now + 100
}

const game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv')

game.state.add('gameState', gameState)
game.state.start('gameState')






















bs
