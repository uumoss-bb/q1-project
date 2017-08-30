var player
var total = 0
var mob = []
var bullet;
var bullets;
var bulletTime = 0;

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
    player = game.add.sprite(300, 300, 'player')
    game.physics.arcade.enable(player)
    player.body.collideWorldBounds = true
    player.anchor.setTo(0.5, 0.5)
    game.camera.follow(player)

    badyCreation();
    this.bady = game.add.sprite(game.world.randomX, game.world.randomY, 'bady')
    this.bady.anchor.setTo(0.5, 0.5)
    game.physics.arcade.enable(this.bady)

    // //fireBall 1.0
    // weapon = game.add.weapon(30, 'fireBall')
    // // this kills the bullet when it leaves the bounds
    // weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    // weapon.bulletSpeed = 600;
    // weapon.fireRate = 150
    // weapon.trackSprite(player, 0, 0, true)

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    bullets.createMultiple(40, 'fireBall');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);



  },

  update: function () {

    //player movement
    player.rotation = game.physics.arcade.angleToPointer(player)
    //bady movement
    if(player.x && player.y !== this.bady.x && this.bady.y){
       this.bady.rotation = game.physics.arcade.angleBetween(this.bady, player) + 1.57079633
       game.physics.arcade.moveToObject(this.bady, player, 100)
    }
    //Mob movement
    for (let a = 0; a < mob.length; a++) {
      mob[a].anchor.setTo(0.5, 0.5)
      game.physics.arcade.enable(mob[a])
      mob[a].rotation = game.physics.arcade.angleBetween(mob[a], player) + 1.57079633
      game.physics.arcade.moveToObject(mob[a], player, 100)
    }

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
    if(total < 200 && game.time.now > timer){
      badyCreation();

    }

    // shooting fireBall
    if(game.input.activePointer.isDown){
      fireBullet()
    }
    //fireBall hits bady?
    if(bullet.x && bullet.y === this.bady.x && this.bady.y){
      badyDeath()
    }

  }
}


function badyCreation(){
  this.bady = game.add.sprite(game.world.randomX, game.world.randomY, 'bady')
  mob.unshift(this.bady)

  total++;
  timer = game.time.now + 100;

}
function badyDeath (){

  console.log('hit')
}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 16, player.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = player.rotation;
            game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 50;
        }
    }

}


const game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv')

game.state.add('gameState', gameState)
game.state.start('gameState')






















bs
