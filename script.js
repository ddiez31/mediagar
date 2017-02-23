
// var game = new Phaser.Game(900, 600, Phaser.AUTO, "#app", {preload: preload, create: create, update: update});
var game = new Phaser.Game($(window).width(), $(window).height(), Phaser.AUTO, "#app", {preload: preload, create: create, update: update, render: render});


function preload(){
	game.load.image("mediapart", "assets/journal.png");
	game.load.image("fond", "assets/fond.png");
	game.load.image("poulpe", "assets/superpowers-logo.png");
}

var
player,
graphic,
fond,
sources,
source,
posX,
posY,
nbsource = 0,
i=0,
wwidth,
wheight,
playerspeed= 600,
score= 0,
balls;

//KONAMI CODE
if ( window.addEventListener ) {
	var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
	window.addEventListener("keydown", function(e){
		kkeys.push( e.keyCode );
		if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			console.log('coucoukonami');
			kkeys = [];
		}
	}, true);
}

$(window).on('contextmenu', function(e){
	e.preventDefault();
});

var colors = ["FF0000", "00FF00", "0000FF", "FFFF00", "00FFFF"];
var signes = ["+", "-"];
function randArray(input){
	return input[Math.floor(Math.random()*input.length)]
}

function cercles(couleur, opacity, sprite, rand){
	graphic = game.add.graphics();
	if(sourcesfiable.children.indexOf(sprite) >-1 || sourcesnonfiable.children.indexOf(sprite) >-1){
		graphic.lineStyle(5, 0x000000, 1);
		// graphic.anchor.
	}
	graphic.beginFill("0x"+couleur, opacity);
	// graphic.drawImag	e("image", 100, 100);

	if(rand){
		graphic.drawCircle(0, 0, game.rnd.integerInRange(sprite.width, sprite.width+250));
	}else{
		graphic.drawCircle(0, 0, sprite.width*2);
	}
	return graphic;
}



function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// game.stage.backgroundColor = '#FFFFFF';
	fond = game.add.tileSprite(-1000, -1000, 2000, 2000, 'fond');
	game.world.setBounds(-1000, -1000, 2000, 2000);
	wwidth = game.world.width;
	wheight = game.world.height;

	sourcesfiable = game.add.group();
	sourcesfiable.enableBody = true;
	sourcesfiable.physicsBodyType = Phaser.Physics.ARCADE;
	sourcesfiable.setAll('anchor.x', 0.5);
	sourcesfiable.setAll('anchor.y', 0.5);
	sourcesfiable.collideWorldBounds = true;
	sourcesfiable.setAll("setCircle", 100);

	sourcesnonfiable = game.add.group();
	sourcesnonfiable.enableBody = true;
	sourcesnonfiable.physicsBodyType = Phaser.Physics.ARCADE;
	sourcesnonfiable.setAll('anchor.x', 0.5);
	sourcesnonfiable.setAll('anchor.y', 0.5);
	sourcesnonfiable.collideWorldBounds = true;
	sourcesnonfiable.setAll("setCircle", 100);
	

	player = game.add.sprite(0, 0);
	player.anchor.setTo((player.width)/32);
	game.physics.arcade.enable(player);
	player.enableBody = true;
	player.body.collideWorldBounds = true;
	player.addChild(cercles(randArray(colors), 1, player, false));
	player.body.setCircle(player.width);


	player.body.allowRotation = false;
	game.camera.follow(player);
}

var extDroite = wwidth/2-200,
extGauche = -(wwidth/2)+200,
extHaut = -(wheight/2)+200,
extBas = wheight/2-200;

function update(){

	i++

	// game.physics.arcade.collide(player , [sourcesnonfiable, sourcesfiable]);
	// game.physics.arcade.collide(sourcesfiable, [sourcesnonfiable, sourcesfiable]);
	// game.physics.arcade.collide(sourcesnonfiable, sourcesnonfiable);

	game.physics.arcade.overlap(sourcesfiable, player, collideHandlerFiable, null, this);
	game.physics.arcade.overlap(sourcesnonfiable, player, collideHandlerNonFiable, null, this);

	player.rotation = game.physics.arcade.moveToPointer(player, 60, game.input.activePointer, playerspeed);

	if(i > 9999){
		i = 0;
		console.log('coucou i = '+i)
	}

	if(nbsource<50 && i%10===0){

		playpos = player.position.x + " X et Y " + player.position.y;
		// console.log(playpos)
		nbsource++;
		// // var popctn = 0;

		// do{
		// 	if(randArray(signes)=== "+"){
		// 		randbet = game.rnd.integerInRange(200, 500);
		// 		posX = player.position.x - (-randbet);
		// 		if(posX < extDroite){
		// 			var pop = false;
		// 			nbsource--;
		// 		}else{
		// 			var pop = true;
		// 		}
		// 	}else{
		// 		randbet = game.rnd.integerInRange(200, 500);
		// 		posX = player.position.x - randbet;
		// 		if(posX > extGauche){
		// 			var pop = false;
		// 			nbsource--;
		// 		}else{
		// 			var pop = true;
		// 		}
		// 	}
		// 	console.log(pop);
		// }while(!pop);
		// // if(pop){
		// // 	popctn++;
		// // }

		// do{
		// 	if(randArray(signes)=== "+"){
		// 		randbet = game.rnd.integerInRange(200, 500);
		// 		posY = player.position.y - (-randbet);
		// 		if(posY < extBas){
		// 			var pop = false;
		// 			nbsource--;
		// 		}else{
		// 			var pop = true;
		// 		}
		// 	}else{
		// 		randbet = game.rnd.integerInRange(200, 500);
		// 		posY = player.position.y - randbet;
		// 		if(posY > extHaut){
		// 			var pop = false;
		// 			nbsource--;
		// 		}else{
		// 			var pop = true;
		// 		}
		// 	}
		// }while(!pop);
		// // if(pop){
		// // 	popctn++;
		// // }
		randbet = game.rnd.integerInRange(-500, 500);
		posX = player.position.x - (- randbet);
		randbet = game.rnd.integerInRange(-500, 500);
		posY = player.position.y - (- randbet);

		console.log("pos X " + Math.floor(posX) + " pos Y " + Math.floor(posY));
		if(game.rnd.integerInRange(0, 1) == 0){
			source = sourcesfiable.create(posX, posY, "mediapart");
			var color = "0000FF";
		}else{
			source = sourcesnonfiable.create(posX, posY, "mediapart");
			var color = "FF0000";
		}
		source.body.setCircle(source.width);
		source.anchor.setTo(0.5);
		source.addChild(cercles(randArray(colors), 0.5, source, true));
		// source.anchor.setTo(source.width/32);

		// console.log(sourcesfiable.children.indexOf(player))
		// sources.velocity.x = 200
	}

	if(i%60===0){

	}
}

function collideHandlerFiable(player, source){
	source.kill();
	nbsource--;
	score ++;
	player.width += 5;
	player.height += 5;
	// player.removeChild();
	// player.addChild(cercles(randArray(colors), 1, player, false))
	player.body.setCircle(player.width);
	player.anchor.setTo((player.width)/32);
	playerspeed += playerspeed/35;
	console.log(score)
}
function collideHandlerNonFiable(player, source){
	player.kill();
}

function render(){
	game.debug.body(player);
	if(source){
		game.debug.body(source);
	}
	// if(sourcesfiable){
	// 	sourcesfiable.forEach(game.debug.body(sourcesfiable.this));
	// }

}

$(document).ready(function(){

	console.log('coucou');

})