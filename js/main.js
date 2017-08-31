var player
var playerLife = 3
var livesString
var lifetext
var invincible = false

var baddie
var el
var mob

var total = 0
var timer

var bullet
var bullets
var bulletTime = 0

var kills = 0
var killString
var scoreText

let gameState = {

  preload: function () {
    //my assets
    this.load.image('background', 'assets/wizBizBackG.png')
    this.load.image('player', 'assets/people/wiz_0.1.png')
    this.load.image('baddie', 'assets/people/bady_0.1.png')
    this.load.image('fireBall', 'assets/fireBall.png')
    this.load.image('playBtn', 'assets/play_btn.png')
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
    baddieCreation()
    mob.setAll('anchor.x', 0.5)
    mob.setAll('anchor.y', 0.5)

    // fireBall
    bullets = game.add.group()
    bullets.enableBody = true
    bullets.physicsBodyType = Phaser.Physics.ARCADE
    bullets.createMultiple(40, 'fireBall')
    bullets.setAll('anchor.x', 0.5)
    bullets.setAll('anchor.y', 0.5)

    //score text
    killString = 'Deamons Slain : '
    scoreText = game.add.text(10, 10, killString + kills, {font: '34px Helvetica', fill: "#212329"})
    scoreText.fixedToCamera = true

    //lives text
    livesString = 'Lives : '
    lifeText = game.add.text(10, 50, livesString + playerLife, {font: '34px Helvetica', fill: "#212329"})
    lifeText.fixedToCamera = true

    //end game text
    endGameText = game.add.text(500, 300,`  GAME OVER\nClick to Restart`, { font: '84px Helvetica', fill: '#212329' });
    endGameText.anchor.setTo(0.5, 0.5);
    endGameText.visible = false;
    endGameText.fixedToCamera = true

  },

  update: function () {

    //player rotates towards the pointer
    player.rotation = game.physics.arcade.angleToPointer(player)

    mob.forEach(function(el){
      //baddie movement + physics + anchor point
      el.anchor.setTo(.5,.5)
      game.physics.arcade.enable(el)
      el.rotation = game.physics.arcade.angleBetween(el, player) + 1.57079633
      game.physics.arcade.moveToObject(el, player, 100)

      bullets.forEach(function (bu){
        //this check to see if a bullet hit a baddie
        game.physics.arcade.overlap(bu, el, baddieDeath) //check if baddie gets hit
        if(invincible === false){
          //this check to see if a baddie hit the player
          game.physics.arcade.overlap(player, el, wizDeath) //check if baddie hits player
        }
        else {}

          function baddieDeath (){
            // after the baddie gets hit with a bullet
            el.kill() //the baddie dies
            bu.kill() //the bullet dies
            kills++ //the score goes up
            scoreText.text = killString + kills // update score board
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

    //baddie spawner
    if(total < 200 && game.time.now > timer){
      baddieCreation()
    }

    // shooting fireBall
    if(game.input.activePointer.isDown){
      fireBullet()
    }

  }
}

function fireBullet () {

    if (game.time.now > bulletTime){
      bullet = bullets.getFirstExists(false)

      if (bullet){
        bullet.reset(player.x + 16, player.y + 16)
        bullet.lifespan = 2000
        bullet.rotation = player.rotation
        game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity)
        bulletTime = game.time.now + 120
    }
  }
}

function baddieCreation(){
  mob.add(game.add.sprite(game.world.randomX, game.world.randomY, 'baddie'))

  total++
  timer = game.time.now + 100
}
function wizDeath (){

  player.kill()
  invincible = true
  playerLife-- //the live goes down
  lifeText.text = livesString + playerLife // update life text
  scoreText.text = killString + kills // update score board

  if(playerLife > 0){
    //this resets the player
    player.reset(game.world.centerX, game.world.centerY)
    //this keeps you in invincible mode for 2000 units of time
    game.time.events.add(2000, () => invincible = false)
  }
  else if(playerLife === 0){

    // game over, click to restart
    endGameText.visible = true;

    lifeText.text = ' ' // update life text
    scoreText.text = ' ' // update score board

    lifeText.text = livesString + playerLife // update life text
    scoreText.text = killString + kills // update score board

    //click to restart
    game.input.onTap.addOnce(restart,this);

    function restart () { //this has to be here because of the playerLife and kills

      //  A new level starts

      //  baddie reset
      mob.removeAll()
      baddieCreation()

      //revives the player
      player.reset(game.world.centerX, game.world.centerY)

      //resets the life count
      playerLife += 3
      kills *= 0
      total *= 0
      lifeText.text = livesString + playerLife // update life text
      scoreText.text = killString + kills // update score board

      invincible = false

      //hides the text
      endGameText.visible = false

    }
    }
  }






















bs
