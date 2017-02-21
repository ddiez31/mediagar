console.log("appinit");

var game = new Phaser.Game(900, 600, Phaser.AUTO, "#app", {preload: preload, create: create, update: update});


function preload(){
	game.load.image("mediapart", "assets/journal.png");
}

var player,
graphic,
balls;

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	// game.physics.startSystem(Phaser.Physics.P2JS);
	// player = game.add.sprite(200, 200, "mediapart");
	// game.physics.p2.enable(player);

	// game.stage.backgroundColor = '#FFFFFF';
	game.add.tileSprite(0, 0, 4000, 4000, 'mediapart');

	game.world.setBounds(0, 0, 4000, 4000);

	balls = game.add.group();

	graphic = game.add.graphics();
	graphic.lineStyle(10, 0x000000, 1);

	graphic.beginFill(0x0000FF, 1);
	graphic.drawCircle(0, 0, 200);



	player = game.add.sprite(0, 0).addChild(graphic);
	player.enableBody = true;
	player.anchor.setTo(0.5, 0.5);


	game.physics.arcade.enable(player);
	player.body.allowRotation = false;
	game.camera.follow(player);
}


function update(){

	player.rotation = game.physics.arcade.moveToPointer(player, 60, game.input.activePointer, 1000);


}

$(document).ready(function(){

	console.log('coucou');

})