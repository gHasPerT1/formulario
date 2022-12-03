
var congfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene:{
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(congfig) 


function preload(){
    this.load.image("fondo","./imann/fondoq.jpg");
    this.load.spritesheet("play","./imann/gamewebuso.png",{frameWidth: 69,frameHeight: 127,});


}

function create(){
    this.add.image(313,152,"fondo");
    this.add.image(313,152,"play")

}

function update(){
    
}
