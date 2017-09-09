
var player
var playerLife = 3
var lifeText
var livesString
var invincible = false

var baddie
var el
var mob
var baddieX = 0
var baddieY = 0

var total = 0
var timer
var maxBaddies = 20
var wave = 1
var waveText
var wavePause = false

var powerList = [fireBall]
var powerNum = 0
var bullet
var bulletTime = 0
var fireBalls
var iceShards
var rockFists
var iceInstruction
var fireUpgradeText

var kills = 0
var killString
var scoreText

var endGameText

var test

var gameState = {

  preload: function () {
    //my assets
    this.load.image('background', 'assets/wizBizBackG.png')
    this.load.image('player', 'assets/people/wiz_0.1.png')
    this.load.image('baddie', 'assets/people/bady_0.1.png')
    this.load.image('fireBall', 'assets/fireBall.png')
    this.load.image('iceShard', 'assets/ice_shard.png')
    this.load.spritesheet('rockFist', 'assets/rockFist.png', 54, 64, 5)
    this.load.image('playBtn', 'assets/play_btn.png')
  },

  create: function () {

    //the world
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.setBounds(0, 0, 1500, 1500)
    game.add.tileSprite(0, 0, 1500, 1500, 'background')

    //the bad guys
    mob = game.add.group()
    mob.enableBody = true
    mob.physicsBodyType = Phaser.Physics.ARCADE
    baddieCreation()
    mob.setAll('anchor.x', 0.5)
    mob.setAll('anchor.y', 0.5)

    // fireBall
    fireBalls = game.add.group()
    fireBalls.enableBody = true
    fireBalls.physicsBodyType = Phaser.Physics.ARCADE
    fireBalls.createMultiple(40, 'fireBall')
    fireBalls.setAll('anchor.x', 0.5)
    fireBalls.setAll('anchor.y', 0.5)

    // iceShard
    iceShards = game.add.group()
    iceShards.enableBody = true
    iceShards.physicsBodyType = Phaser.Physics.ARCADE
    iceShards.createMultiple(40, 'iceShard')
    iceShards.setAll('anchor.x', 0.5)
    iceShards.setAll('anchor.y', 0.5)

    // rockFist
    rockFists = game.add.group()
    rockFists.enableBody = true
    rockFists.physicsBodyType = Phaser.Physics.ARCADE
    rockFists.createMultiple(3,'rockFist')
    rockFists.setAll('anchor.x', 0.5)
    rockFists.setAll('anchor.y', 0.5)

    //this the player
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player')
    game.physics.arcade.enable(player)
    player.body.collideWorldBounds = true
    player.anchor.setTo(0.5, 0.5)
    game.camera.follow(player)

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

    //wave text
    waveText = game.add.text(900, 30, 'Wave:' + wave, { font: '34px Helvetica', fill: '#212329' })
    waveText.anchor.setTo(0.5, 0.5);
    waveText.visible = true
    waveText.fixedToCamera = true

    //ice Shard anoucement
    iceInstruction = game.add.text(500, 200, '  You now have Ice powers\nuse 1 and 2 to toggle powers', { font: '34px Helvetica', fill: '#212329' })
    iceInstruction.anchor.setTo(0.5, 0.5);
    iceInstruction.visible = false
    iceInstruction.fixedToCamera = true

    //fireBall upgrade anoucement
    fireUpgradeText = game.add.text(500, 200, 'You Fire Ball has leveled UP!', { font: '34px Helvetica', fill: '#212329' })
    fireUpgradeText.anchor.setTo(0.5, 0.5);
    fireUpgradeText.visible = false
    fireUpgradeText.fixedToCamera = true

    //rockFist anoucement
    rockInstruction = game.add.text(500, 200, 'You now have Rock powers, hit SPACEBAR to use', { font: '34px Helvetica', fill: '#212329' })
    rockInstruction.anchor.setTo(0.5, 0.5);
    rockInstruction.visible = false
    rockInstruction.fixedToCamera = true

  },

  update: function () {

    // this spawns bad guys after 2000 units of time
    game.time.events.add(2000, baddieSpawner)

    //player rotates towards the pointer
    player.rotation = game.physics.arcade.angleToPointer(player)

    //baddie movement + physics + anchor point
    mob.forEach(function(el){
      el.anchor.setTo(.5,.5)
      game.physics.arcade.enable(el)
      el.rotation = game.physics.arcade.angleBetween(el, player) + 1.57079633
      game.physics.arcade.moveToObject(el, player, 130)
      game.physics.arcade.collide(el, mob)
    })

    //this handles the pause between waves
    if(mob.length === 0){
      //this updates player on new powers
      if(wave === 2){
        iceInstruction.visible = true
      }
      if(wave === 4){
        fireUpgradeText.visible = true
      }
      if(wave === 6){
        rockInstruction.visible = true
      }
      game.time.events.add(4000, () => wavePause = true) // this restarts things on a starter
    }
    else if ( total > 0 ) {
      wavePause = false
    }

    // this resets everything for the next wave
    if (wavePause === true){
      wave++
      waveText.text = "Wave: " + wave
      maxBaddies += 50
      total = 0

      //this turns the instrunctions off once every thing restarts
      iceInstruction.visible = false
      fireUpgradeText.visible = false
      rockInstruction.visible = false

      if(wave >= 5){
        playerLife++
        lifeText.text = livesString + playerLife // update life text
      }
    }

    // controls for toggling power
    if(game.input.keyboard.isDown(Phaser.Keyboard.ONE)){
      powerNum = 0
    }
    if(wave >= 3) {
      if(game.input.keyboard.isDown(Phaser.Keyboard.TWO)){
        powerNum = 1
      }
    }
    if(wave >= 7) {
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        rockFist()
      }
    }

    //this updates your powerList as you go on
    if( wave === 3 && total <= 0) { //You want the total there so this only happens for a second
      powerList.push(iceShard)
    }
    if( wave === 5 && total <= 0) { //You want the total there so this only happens for a second
      powerList.splice(0, 1, fireBall2)
    }
    // if( wave === 7 && total <= 0) { //You want the total there so this only happens for a second
    //   powerList.push(rockFist)
    // }


    powerInUse(powerList[powerNum])

    playerMovement()

    DamageHandler(fireBalls)

    DamageHandler(iceShards)

    rockDamageHandler()// rock powers need its own damgae handler so the bullets dont die on impact
    //this stops the rockFist from moving after animationn is complete
    rockFists.forEach((rock) =>
    rock.events.onAnimationComplete.add(() => game.physics.arcade.velocityFromRotation(player.rotation,
      0, rock.body.velocity)), this, true)

    }
  }

function powerInUse (thePower) {
  if(game.input.activePointer.isDown){
    thePower()
  }
}

function fireBall () {

    if (game.time.now > bulletTime){
      bullet = fireBalls.getFirstExists(false)

      if (bullet){
        bullet.reset(player.x, player.y)
        bullet.lifespan = 1000
        bullet.rotation = player.rotation
        game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity)
        bulletTime = game.time.now + 200
    }
  }
}

function fireBall2 () {

    if (game.time.now > bulletTime){
      // bullet = fireBalls.getFirstExists(false)
      for (var i = 0; i < 3; i++) {
        var bullet = fireBalls.getFirstExists(false);
        if (bullet){
          var bulletOffset = 20 * Math.sin(game.math.degToRad(player.rotation))
          var spreadAngle;
          if (i === 0) spreadAngle = -50;
          if (i === 1) spreadAngle = 0;
          if (i === 2) spreadAngle = 50;
          bullet.reset(player.x + bulletOffset, player.y )
          bullet.lifespan = 1000
          bullet.rotation = player.rotation
          game.physics.arcade.velocityFromRotation(player.rotation + spreadAngle, 400, bullet.body.velocity)
          bulletTime = game.time.now + 350
      }
    }
  }
}

function iceShard () {

  if (game.time.now > bulletTime){
    bullet = iceShards.getFirstExists(false)

    if (bullet){
      bullet.reset(player.x, player.y)
      bullet.lifespan = 1000
      bullet.rotation = player.rotation
      game.physics.arcade.velocityFromRotation(player.rotation, 600, bullet.body.velocity)
      bulletTime = game.time.now + 100
    }
  }
}

function rockFist () {

  if (game.time.now > bulletTime){
    // bullet = fireBalls.getFirstExists(false)
    for (var i = 0; i < 3; i++) {
      var bullet = rockFists.getFirstExists(false);
      if (bullet){
        var bulletOffset = 20 * Math.sin(game.math.degToRad(player.rotation))
        var spreadAngle;
        if (i === 0) spreadAngle = -200
        if (i === 1) spreadAngle = 0;
        if (i === 2) spreadAngle = 200;
        bullet.reset(player.x + bulletOffset, player.y )
        bullet.lifespan = 1000
        game.physics.arcade.velocityFromRotation(player.rotation + spreadAngle, 150, bullet.body.velocity)
        bulletTime = game.time.now + 350
        rockAnime = bullet.animations.add('rockAnime',[0,1,2,3,4])
        bullet.animations.play('rockAnime',10, false)
      }
    }
  }

}

function playerMovement () {

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

}

function DamageHandler (magicBullets) {

  mob.forEach(function(el){

    magicBullets.forEach(function (bu){
      //this check to see if a bullet hit a baddie
      game.physics.arcade.overlap(bu, el, baddieDeath) //check if baddie gets hit

      if(invincible === false){
        //this check to see if a baddie hit the player
        game.physics.arcade.overlap(player, el, playerDeath) //check if baddie hits player
      }

      function baddieDeath (){
        // after the baddie gets hit with a bullet
        mob.remove(el) //the baddie dies
        bu.kill() //the bullet dies
        kills++ //the score goes up
        scoreText.text = killString + kills // update score board
      }

      function playerDeath () {

        player.kill()
        invincible = true
        playerLife-- //the live goes down
        lifeText.text = livesString + playerLife // update life text

        if(playerLife > 0){
          //this resets the player
          player.reset(game.world.randomX, game.world.randomY)
          //this keeps you in invincible mode for 2000 units of time
          game.time.events.add(2000, () => invincible = false)
        }
        else if(playerLife === 0) {

          // game over, click to restart
          endGameText.visible = true;

          //click to restart
          game.input.onTap.addOnce(restart,this);


        }
      }

    })
  })

}

function rockDamageHandler () {

  mob.forEach(function(el){

    rockFists.forEach(function (bu){
      //this check to see if a bullet hit a baddie
      game.physics.arcade.overlap(bu, el, baddieDeath) //check if baddie gets hit

      if(invincible === false){
        //this check to see if a baddie hit the player
        game.physics.arcade.overlap(player, el, playerDeath) //check if baddie hits player
      }

      function baddieDeath (){
        // after the baddie gets hit with a bullet
        mob.remove(el) //the baddie dies
        kills++ //the score goes up
        scoreText.text = killString + kills // update score board
      }

      function playerDeath () {

        player.kill()
        invincible = true
        playerLife-- //the live goes down
        lifeText.text = livesString + playerLife // update life text

        if(playerLife > 0){
          //this resets the player
          player.reset(game.world.randomX, game.world.randomY)
          //this keeps you in invincible mode for 2000 units of time
          game.time.events.add(2000, () => invincible = false)
        }
        else if(playerLife === 0) {

          // game over, click to restart
          endGameText.visible = true;

          //click to restart
          game.input.onTap.addOnce(restart,this);


        }
      }

    })
  })

}

function baddieCreation(x, y) {
  mob.add(game.add.sprite(x, y, 'baddie'))

  total++
  timer = game.time.now + 50
}

function baddieSpawner () {

  if(total < maxBaddies && game.time.now > timer && mob.length < 200) {
    var spawnBufferDist = 40;

    var rndX = Math.floor(Math.random() * (1000 - 1 + 1)) // [1-1000]
    var rndY = Math.floor(Math.random() * (1000 - 1 + 1)) // [1-600]

    if (
        (rndX < player.x - spawnBufferDist || rndX > player.x + spawnBufferDist) &&
        (rndY < player.y - spawnBufferDist || rndY > player.y + spawnBufferDist)
       ) {
      // random coords are in bounds
      baddieCreation(rndX, rndY)
    }
    else {
      baddieSpawner()
    }
  }
}

function restart () {

  //  A new level starts

  //  baddie reset
  mob.removeAll()

  //revives the player
  player.reset(game.world.centerX, game.world.centerY)

  //resets the life count
  playerLife += 3
  kills *= 0
  total *= 0
  maxBaddies = 20
  wave = 1
  powerNum = 0
  powerList.splice(0, 2)
  powerList.push(fireBall)
  waveText.text = 'Wave: ' + wave
  lifeText.text = livesString + playerLife // update life text
  scoreText.text = killString + kills // update score board

  invincible = false

  //hides the text
  endGameText.visible = false

}
