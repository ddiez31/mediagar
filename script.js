console.log("appinit");

var game = new Phaser.Game(900, 600, Phaser.AUTO, "#app", {preload: preload, create: create, update: update});


function preload(){
	game.load.image("mediapart", "assets/journal.png");
	game.load.image("fond", "assets/fond.png");
}

var player,
graphic,
fond,
nbsource = 0,
balls;

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	// game.physics.startSystem(Phaser.Physics.P2JS);
	// player = game.add.sprite(200, 200, "mediapart");
	// game.physics.p2.enable(player);

	// game.stage.backgroundColor = '#FFFFFF';
	fond = game.add.tileSprite(0, 0, 4000, 4000, 'fond');
	game.world.setBounds(0, 0, 4000, 4000);

	balls = game.add.group();


	function cercles(rayon, couleur){
		graphic = game.add.graphics();
		graphic.lineStyle(8, 0x000000, 1);
		
		graphic.beginFill("0x"+couleur, 1);
		graphic.drawCircle(0, 0, rayon);
		return graphic;
	}



	player = game.add.sprite(0, 0).addChild(cercles(100, "0000FF"));
	player.enableBody = true;
	player.anchor.setTo(0.5, 0.5);


	game.physics.arcade.enable(player);
	player.body.allowRotation = false;
	game.camera.follow(player);
}	


function update(){

	if(nbsource<5){
		nbsource++
		// source = sources.create(game.world.randomX, game.world.randomY, "mediapart")
	}
	player.rotation = game.physics.arcade.moveToPointer(player, 60, game.input.activePointer, 600);


}

$(document).ready(function(){

	console.log('coucou');

})