
// var game = new Phaser.Game(900, 600, Phaser.AUTO, "#app", {preload: preload, create: create, update: update});
var w = $(window).width();
var h = $(window).height();
var game = new Phaser.Game(w, h, Phaser.AUTO, "#app", {preload: preload, create: create, update: update, render: render});


function preload(){
	game.load.image("mediapart", "assets/mediapart.png");
	game.load.image("20min", "assets/20minutes.jpg");
	game.load.image("bfm", "assets/BFMTV.png");
	game.load.image("lagauche", "assets/lagauchematuer.png");
	game.load.image("lavie", "assets/lavie.png");
	game.load.image("reseauinter", "assets/reseauinternationnal.png");
	game.load.image("legorafi", "assets/legorafi.png");
	game.load.image("aujourdhui", "assets/aujourdhui.png");
	game.load.image("sudouest", "assets/sudouest.png");
	game.load.image("zelium", "assets/zelium.png");
	game.load.image("rtbf", "assets/rtbf.png");
	game.load.image("letemps", "assets/letemps.png");
	game.load.image("topito", "assets/topito.png");
	game.load.image("lefigaro", "assets/lefigaro.png");
	game.load.image("atlantico", "assets/atlantico.png");
	game.load.image("morandinisante", "assets/morandinisante.png");
	game.load.image("hoaxbuster", "assets/hoaxbuster.png");
	game.load.image("branched", "assets/branched.png");
	game.load.image("lesiteinfo", "assets/lesiteinfo.png");
	game.load.image("fond", "assets/fond.png");
	game.load.image("poulpe", "assets/superpowers-logo.png");
	game.load.spritesheet("explosion1", "/assets/explosion.png", 64, 64, 24);
	game.load.spritesheet("explosion2", "/assets/nucleaire.png", 320, 233, 25);
	game.load.spritesheet("explosion3", "/assets/explosiion.png", 47, 58, 25);
	game.load.spritesheet("explosion4", "/assets/explosion-sprite.png", 96, 96, 15);
	game.load.spritesheet("explosion5", "/assets/explosang.png", 128, 128, 16);
}

var colors = ["FF0000", "00FF00", "0000FF", "FFFF00", "00FFFF"];
var nonfiables = ["lagauche", "reseauinter", "legorafi", "sudouest", "zelium", "topito", "morandinisante", "branched"];
var fiables = ["20min", "bfm", "mediapart", "lavie", "aujourdhui", "rtbf", "lefigaro", "atlantico", "hoaxbuster", "lesiteinfo"];
var signes = ["+", "-"];
var explosions = [["explosion1", 6, 0.5], ["explosion2", 2, 0.75], ["explosion3", 8, 0.75], ["explosion4", 3, 0.95], ["explosion5", 3, 0.5]]
function randArray(input){
	return input[Math.floor(Math.random()*input.length)]
}

var
player,
menu,
telported = false,
graphic,
fond,
sources,
source,
posX,
posY,
nbsource = 0,
nbteleport = 0,
i=0,
j=0,
wwidth,
wheight,
teleporting= false,
playerspeed= 600,
score= 0,
balls;

//KONAMI CODE
if ( window.addEventListener ) {
	var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
	window.addEventListener("keydown", function(e){
		kkeys.push( e.keyCode );
		if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			koCode();
			kkeys = [];
		}
	}, true);
}

$(window).on('contextmenu', function(e){
	e.preventDefault();
});


function cercles(couleur, opacity, sprite, rand){
	graphic = game.add.graphics();
	if(sourcesfiable.children.indexOf(sprite) >-1 || sourcesnonfiable.children.indexOf(sprite) >-1){
		graphic.lineStyle(5, 0x000000, 1);
	}
	graphic.beginFill("0x"+couleur, opacity);
	if(rand){
		graphic.drawCircle(0, (source.height - source.width)/32, game.rnd.integerInRange(sprite.width, sprite.width+sprite.width/10));
	}else{
		graphic.drawCircle(0, 0, sprite.width*2);
	}
	return graphic;
}

function koCode(){
	console.log('coucoukonami');
}

function pausage(e) {
	if(e.which == 112 || e == "ESC"){
	game.paused = true;

	menu = game.add.sprite(w/2, h/2, 'menu');
	menu.anchor.setTo(0.5, 0.5);
	}

}
$(window).on("keypress", function(event){
	pausage(event);
});

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// game.stage.backgroundColor = '#FFFFFF';
	fond = game.add.tileSprite(-1500, -1500, 3000, 3000, 'fond');
	game.world.setBounds(-1500, -1500, 3000, 3000);
	wwidth = game.world.width;
	wheight = game.world.height;

	buttons	= game.add.group();
	buttons.x = w/2;

	
	game.input.onDown.add(unpause, self);

	sourcesfiable = game.add.group();
	sourcesfiable.enableBody = true;
	sourcesfiable.physicsBodyType = Phaser.Physics.ARCADE;
	sourcesfiable.checkWorldBounds = true;
	sourcesfiable.outOfBoundsKill = true;

	sourcesnonfiable = game.add.group();
	sourcesnonfiable.enableBody = true;
	sourcesnonfiable.physicsBodyType = Phaser.Physics.ARCADE;
	sourcesnonfiable.checkWorldBounds = true;
	sourcesnonfiable.outOfBoundsKill = true;
	
	playerballs = game.add.group();
	player = playerballs.create(0, 0);
	player.anchor.setTo((player.width)/32);
	game.physics.arcade.enable(player);
	player.enableBody = true;
	player.body.collideWorldBounds = true;
	player.addChild(cercles(randArray(colors), 1, player, false));
	player.body.setCircle(player.width);


	player.body.allowRotation = false;
	camera = game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	nbtext = "nombre de merdouille "
	scortext = "score "
	teletext = "teleportation "
	nbsourceText = game.add.text(20, 20, nbtext + nbsource, { font: '36px Arial', fill: '#000' });
	nbsourceText.fixedToCamera = true;
	scoreText = game.add.text(20, 50, scortext + score, { font: '36px Arial', fill: '#000' });
	scoreText.fixedToCamera = true;
	nbTeleportText = game.add.text(20, 80, teletext + nbteleport, { font: '36px Arial', fill: '#000' });
	nbTeleportText.fixedToCamera = true;
}

var extDroite = wwidth/2-200,
extGauche = -(wwidth/2)+200,
extHaut = -(wheight/2)+200,
extBas = wheight/2-200;

function update(){
	i++;
	game.physics.arcade.collide(sourcesnonfiable, sourcesnonfiable);
	game.physics.arcade.collide(sourcesfiable, [sourcesnonfiable, sourcesfiable]);
	game.physics.arcade.overlap(sourcesfiable, player, collideHandlerFiable, null, this);
	game.physics.arcade.overlap(sourcesnonfiable, player, collideHandlerNonFiable, null, this);

	if(game.input.mousePointer.isDown && nbteleport > 0 && !teleporting && !game.pause){
		telported = true;
		teleporting = true;
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		player.rotation = false;
	}if(game.input.mousePointer.isUp && teleporting){
		teleporting = false;
		teleport();
	}if(!teleporting){
		player.rotation = game.physics.arcade.moveToPointer(player, 60, game.input.activePointer, playerspeed);
	}
	// game.physics.arcade.moveToPointer(player, playerspeed);

	if(i > 9999){
		i = 0;
	}

	if(nbsource<20 && i%30===0){

		if(game.rnd.integerInRange(0, 1)==1){
			posX = game.rnd.integerInRange(player.position.x-300-player.width, player.position.x-150-player.width);
		}else{
			posX = game.rnd.integerInRange(player.position.x+150+player.width, player.position.x+300+player.width);
		}
		if(game.rnd.integerInRange(0, 1)==1){
			posY = game.rnd.integerInRange(player.position.y-300-player.width, player.position.y-150-player.width);
		}else{
			posY = game.rnd.integerInRange(player.position.y+150+player.width, player.position.y+300+player.width);
		}
		
		if(game.rnd.integerInRange(0, 1) == 0){
			source = sourcesfiable.create(posX, posY, randArray(fiables));
			var color = "0000FF";
		}else{
			source = sourcesnonfiable.create(posX, posY, randArray(nonfiables));
			var color = "FF0000";
		}
		source.addChild(cercles(randArray(colors), 0.5, source, true));
		source.anchor.setTo(0.5);
		source.body.setCircle(source.width/2);
		nbsourceText.text = nbtext + nbsource;
	}
	if(i%15===0 && source){
		j=0;
		k=0;
		nbsource=0;
		sourcesfiable.forEach(function(){
			sourcesfiable.children[j].checkWorldBounds = true;
			sourcesfiable.children[j].outOfBoundsKill = true;
			if(game.rnd.integerInRange(0, 1) == 1){
				if(game.rnd.integerInRange(1, 100) > 20){
					sourcesfiable.children[j].body.velocity.x = game.rnd.integerInRange(-200, 200);
					sourcesfiable.children[j].body.velocity.y = game.rnd.integerInRange(-200, 200);
				}else{
					sourcesfiable.children[j].body.velocity.x = game.rnd.integerInRange(-400, 400);
					sourcesfiable.children[j].body.velocity.y = game.rnd.integerInRange(-400, 400);
				}
			}
			if (sourcesfiable.children[j].alive) {
				nbsource++;
				nbsourceText.text = nbtext + nbsource;
			}
			j++;
		});
		sourcesnonfiable.forEach(function(){
			
			if(game.rnd.integerInRange(0, 1) == 1){
				sourcesnonfiable.children[k].checkWorldBounds = true;
				sourcesnonfiable.children[k].outOfBoundsKill = true;
				if(game.rnd.integerInRange(1, 100) > 5){
					sourcesnonfiable.children[k].body.velocity.x = game.rnd.integerInRange(-200, 200);
					sourcesnonfiable.children[k].body.velocity.y = game.rnd.integerInRange(-200, 200);
				}else{
					sourcesnonfiable.children[k].body.velocity.x = game.rnd.integerInRange(-350, 350);
					sourcesnonfiable.children[k].body.velocity.y = game.rnd.integerInRange(-350, 350);
				}
			}
			if (sourcesnonfiable.children[k].alive) {
				nbsource++;
				nbsourceText.text = nbtext + nbsource;
			}
			k++;
		});
	}
	
}

function unpause(event){
	if(game.paused){
		var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
		y1 = h/2 - 180/2, y2 = h/2 + 180/2;

		if(!(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) ){
			menu.destroy();
			buttons.destroy();

			game.paused = false;
		}
		else{
			menu
			console.log(game.input.mousePointer.x, game.input.mousePointer.y)
		}
	}
};

function teleport(){
	player.x = game.input.mousePointer.worldX;
	player.y = game.input.mousePointer.worldY;
	nbteleport--;
	nbTeleportText.text = teletext + nbteleport;
}

function collideHandlerFiable(player, source){
	source.kill();
	nbsource--;
	score ++;
	nbsourceText.text = nbtext + nbsource;
	if(score%10===0){
		nbteleport++;
		nbTeleportText.text = teletext + nbteleport;
	}
	if(player.width < 125){
		player.width += 5;
		player.height += 5;
	}
	player.body.setCircle(player.width);
	player.anchor.setTo((player.width)/32);
	playerspeed += playerspeed/35;
	scoreText.text = scortext + score;
}
function collideHandlerNonFiable(player, source){
	player.kill();
	randexplotabl = randArray(explosions)
	
	explosion = game.add.sprite(100, 100, randexplotabl[0]);
	explosion.animations.add('boom_left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 10, false);
	// explosion.fixedToCamera = true;
	game.physics.arcade.enable(explosion);
	explosion.enableBody = true;
	// explosion.x = player.worldX
	// explosion.y = player.worldY
	explosion.x = player.x;
	explosion.y = player.y;
	explosion.scale.setTo(randexplotabl[1]);
	explosion.anchor.setTo(0.5, randexplotabl[2]);
	explosion.animations.play("boom_left");
}

function debug(ceci){
	game.debug.body(ceci);
}
function render(){
	// sourcesfiable.forEachAlive(debug, this);
	// sourcesnonfiable.forEachAlive(debug, this);
	// game.debug.body(player);
	// if(source){
	// 	game.debug.body(source);
	// }
	// if(sourcesfiable){
	// 	sourcesfiable.forEach(game.debug.body(sourcesfiable.this));
	// }
}

$(document).ready(function(){

	console.log('coucou');

})