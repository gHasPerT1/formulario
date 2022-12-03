

var congfig = {
    type: Phaser.AUTO,
    parent: contenedorjuego1,
    width: 500,
    height: 800,
    physics:{
        default:"arcade",
        arcade:{
            gravity: {y: 300},
            debug: false
        }

    },
    scene:{
        preload: preload,
        create: create,
        update: update,
    }
};
// var BackGround;
var score=0;
var scoreText;
var gameOver = false;
// var MyGame = new Phaser.Game(800,600,Phaser.AUTO,".contenedorjuego")
var game = new Phaser.Game(congfig);



function preload(){
    this.load.image("fondo","./imann/fondoultimo.jpg");
    this.load.image("plataforma","./imann/plataforma1.0.PNG");
    this.load.image("estrella","./imann/estrellaweba.png");
    this.load.image("bomba","./imann/bombaa.png");
    this.load.spritesheet("play","./imann/jugador1.png",{frameWidth: 27,frameHeight: 50,});
    


}

function create(){
    this.add.image(250,475,"fondo")
    // this.add.image(313,152,"fondo");
    // this.add.image(313,152,"play")
    plataforms = this.physics.add.staticGroup();

    plataforms.create(180,800,"plataforma").setScale(3).refreshBody();
    plataforms.create(-50,500,"plataforma");
    plataforms.create(500,600,"plataforma");
    plataforms.create(500,300,"plataforma");
    plataforms.create(-90,200,"plataforma");

    //personaje con variable

    player = this.physics.add.sprite(0,700,"play");
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);


    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("play",{start:0, end:4}),
        frameRate: 10,
        repeat:-1
    });

    this.anims.create({
        key: "rigth",
        frames: this.anims.generateFrameNumbers("play",{start:0, end:4}),
        frameRate: 10,
        repeat:-1
    });
    this.anims.create({
        key: "parar",
        frames :this.anims.generateFrameNumbers("play",{start:0, end:1}),
        frameRate: 0,
        repeat:-1
    })
    //gravedad del personaje
    // player.body.setGravityY(300);

    this.physics.add.collider(player,plataforms);
    cursors = this.input.keyboard.createCursorKeys();  


    stars = this.physics.add.group({
        key: "estrella",
        repeat: 9,
        setXY:{x:12, y:0, stepX:50}
        
    })

    stars.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));
    });

    this.physics.add.collider(stars, plataforms);

    this.physics.add.overlap(player,stars, colectarestrellas,null,true);



    scoreText = this.add.text(16,16, "score: 0",{fontSize:"36px",fill:"black"});

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs,plataforms);

    this.physics.add.collider(player,bombs,hitBomb,null,this);  



    // BackGround = MyGame.add.tileSprite(0,0,9600,600,"fondo");
    // MyGame.world.setBounce(0,0,9600,6000);
  

}

function update(){

    if(gameOver){
        return
    }
    if(cursors.left.isDown){
        player.setVelocityX(-160);
        player.anims.play("left",true)
        player.flipX=true;
    }
    else if (cursors.right.isDown){
        player.setVelocityX(160)
        player.anims.play("rigth",true)
        player.flipX=false;
    }
    else{
        player.setVelocityX(0);
        player.anims.play("parar")
        
    }

    if(cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-400);

    }
}


function colectarestrellas(player,star){
    star.disableBody(true,true);
    score += 10;
    scoreText.setText("score: " + score);

    if(stars.countActive(true) === 0){
        stars.children.iterate(function(child){
            child.enableBody(true, child.x, 0 ,true,true)
        });
        var x = (player.x < 400) ? Phaser.Math.Between(400,800) : Phaser.Math.Between(0,400);
        var bomb = bombs.create(x, 16,"bomba");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200,200),20);
    }

    // var x = (player.x < 400) ? Phaser.Math.Between(400,800) : Phaser.Math.Between(0,400);
    // var bomb = bombs.create(x, 16,"bomba");
    // bomb.setBounce(1);
    // bomb.setCollideWorldBounds(true);
    // bomb.setVelocity(Phaser.Math.Between(-200,200),20);

}


function hitBomb(player,bomb){
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("parar");

    gameOver = true;

}