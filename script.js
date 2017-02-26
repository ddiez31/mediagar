
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
	game.load.spritesheet("p", "assets/pacman.png", 110, 110);
	game.load.spritesheet("pacman", "assets/pacman1.png", 28, 28);
	game.load.spritesheet("button", "assets/buttons.png", 125, 57);
	game.load.spritesheet("explosion1", "assets/explosion.png", 64, 64, 24);
	game.load.spritesheet("explosion2", "assets/nucleaire.png", 320, 233, 25);
	game.load.spritesheet("explosion3", "assets/explosiion.png", 47, 58, 25);
	game.load.spritesheet("explosion4", "assets/explosion-sprite.png", 96, 96, 15);
	game.load.spritesheet("explosion5", "assets/explosang.png", 128, 128, 16);
	game.load.spritesheet("explosion6", "assets/nucleairedessus.png", 128, 128, 20);
	game.load.spritesheet("explosion7", "assets/exploprout.png", 100, 100, 11);
}

var colors = ["FF0000", "00FF00", "0000FF", "FFFF00", "00FFFF"];
var nonfiables = ["lagauche", "reseauinter", "legorafi", "sudouest", "zelium", "topito", "morandinisante", "branched"];
var fiables = ["20min", "bfm", "mediapart", "lavie", "aujourdhui", "rtbf", "lefigaro", "atlantico", "hoaxbuster", "lesiteinfo"];
var signes = ["+", "-"];
var explosions = [["explosion1", 6, 0.5], ["explosion2", 2, 0.75], ["explosion3", 8, 0.75], ["explosion4", 3, 0.95], ["explosion5", 3, 0.5], ["explosion6", 5, 0.65], ["explosion7", 5, 0.5]];
function randArray(input){
	return input[Math.floor(Math.random()*input.length)]
}

var
player,
menu,
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
reviving = false,
konacode = false,
boost = false,
boosting = false,
endboost = false,
boosttime,
boostspeed,
playerspeed= 600,
snonfiaspeed= 200,
score= 0,
balls;

//KONAMI CODE haut haut bas bas droite gauche droite gauche B A
if ( window.addEventListener ) {
	var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
	window.addEventListener("keydown", function(e){
		kkeys.push( e.keyCode );
		if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			konacode =! konacode;
			kkeys = [];
		}
	}, true);
}

$(window).on('contextmenu', function(e){
	e.preventDefault();
});

var konannim = [];
function koCode(){
	teletext = "nb de boosts ";
	nbTeleportText.text = teletext + nbteleport;
	player.children[0].visible = false;
	player.children[1].visible = false;
	player.children[2].visible = true;
	player.kode =! player.kode;
	sources.forEach(function(e){
		e.forEach(function(e){
			// e.kill();
			e.children[1].visible = false;
			e.children[0].visible = true;
			e.kode =! e.kode;
		})
	})
}
function pasKoCode(){
	teletext = "nb de teleportation ";
	nbTeleportText.text = teletext + nbteleport;
	player.children[0].visible = true;
	player.children[1].visible = true;
	player.children[2].visible = false;
	player.kode =! player.kode;
	sources.forEach(function(e){
		e.forEach(function(e){
			// e.kill();
			e.children[1].visible = true;
			e.children[0].visible = false;
			e.kode =! e.kode;
		})
	})
}

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

$(window).on("keypress", function(e){
	if(!game.paused && e.which == 112){
		pausage(e);
	}
	else if(game.paused && e.which == 112){
		unpause(e);
	}
});

function pausage() {
	// console.log(camera.position.x);
	game.paused = true;
}

function unpause(){
	game.paused = false;
	// if(true){
	// }else{
	// }
};

function over() {
	console.log('button over');
}

function out() {

	console.log('button out');
}

function playercreation(){
	if(!player){
		player = playerballs.create(game.camera.x + 600, game.camera.y + 300);
		game.physics.arcade.enable(player);
		player.enableBody = true;
		player.body.collideWorldBounds = true;
		player.addChild(cercles(randArray(colors), 1, player, false));
		player.addChild(game.add.text(-player.width, -player.height/3, "PSEUDO", { font: '15px Arial', fill: '#FFF' }));
		player.body.allowRotation = false;
		player.width = 40;
		player.height = 40;
		player.addChild(game.add.sprite(-player.width, -player.height, "pacman")).scale.setTo(2.5);
		player.children[2].anchor.setTo(-player.height/500, player.width/37);
		player.children[2].animations.add('pacmananim', [0, 1, 2, 3], 10, true);
		player.children[2].animations.play("pacmananim");
		player.children[2].angle = 90;
		player.children[2].visible = false;
		player.body.setCircle(player.width);
		player.anchor.setTo((player.width)/32);
		player.kode = false;
	}else if(!player.alive){
		playerspeed= 600;
		snonfiaspeed= 200;
		explosion.kill();
		player.revive();
		player.width = 40;
		player.height = 40;
		player.body.setCircle(player.width);
		player.anchor.setTo((player.width)/32);
		player.position.x = 0;
		player.position.x = 0;
		score = 0;
		nbteleport = 0;
		scoreText.text = scortext + score;
		nbTeleportText.text = teletext + nbteleport;
		sources.forEach(function(type){
			type.forEach(function(source){
				source.kill();
			})
		})
	}
}

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// game.stage.backgroundColor = '#FFFFFF';
	fond = game.add.tileSprite(-1500, -1500, 3000, 3000, 'fond');
	game.world.setBounds(-1500, -1500, 3000, 3000);
	wwidth = game.world.width;
	wheight = game.world.height;

	playerballs = game.add.group();
	buttons	= game.add.group();
	sources = game.add.group();
	sourcesfiable = game.add.group();
	sourcesnonfiable = game.add.group();
	sources.add(sourcesfiable);
	sources.add(sourcesnonfiable);

	// menu boutons j'abandone pour l'instant !
	// button1 = buttons.create(game.add.button(game.camera.x, game.camera.y, 'button', function(){
	// 	player.visible =! player.visible;
	// 	console.log(game.camera.x, game.camera.y);
	// }, this, 5, 4, 6));
	// // button1.onInputOver.add(over, this);
	// // button1.onInputOut.add(out, this);
	// button1.name = 'sky';
	// button1.anchor.setTo(0.5, 0.5);
	// button1.scale.setTo(5, 5);
	// button1.fixedToCamera = true;
	// button1.visible = false;
	// buttons.forEach(function(e){
	// 	var name = e.name;
	// 	e.addChild(game.add.text(game.camera.x, game.camera.y, "button", { font: '15px Arial', fill: '#FFF' }));
	// });

	sources.forEach(function(sourcetype){
		sourcetype.enableBody = true;
		sourcetype.physicsBodyType = Phaser.Physics.ARCADE;
		sourcetype.checkWorldBounds = true;
		sourcetype.outOfBoundsKill = true;	
	})


	nbtext = "nb de sources ";
	scortext = "score ";
	teletext = "nb de teleportation ";
	nbsourceText = game.add.text(20, 20, nbtext + nbsource, { font: '36px Arial', fill: '#000' });
	scoreText = game.add.text(20, 50, scortext + score, { font: '36px Arial', fill: '#000' });
	nbTeleportText = game.add.text(20, 80, teletext + nbteleport, { font: '36px Arial', fill: '#000' });

	playercreation();
	camera = game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	nbsourceText.fixedToCamera = true;
	scoreText.fixedToCamera = true;
	nbTeleportText.fixedToCamera = true;
	// game.input.addMoveCallback(this);
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
	if(!konacode || !boost){
		game.physics.arcade.overlap(sourcesnonfiable, player, collideHandlerNonFiable, null, this);
	}else if(konacode && boost){
		game.physics.arcade.overlap(sourcesnonfiable, player, collideHandlerFiable, null, this);
	}

	// if (true){
	// 	button.alpha = 1;
	// }else{
	// 	button.alpha = 0.5;
	// }

	if(game.input.mousePointer.isDown && !player.alive){
		playercreation();

		reviving = true;
	}if(game.input.mousePointer.isUp && reviving){
		reviving = false;
	}
	if(game.input.mousePointer.isDown && nbteleport >= 1 && !teleporting && !game.pause && !reviving && !konacode){
		prevspeed = playerspeed;
		playerspeed += 1200;
		teleporting = true;
	}if(game.input.mousePointer.isUp && teleporting && !reviving){
		teleport();
		teleporting = false;
		playerspeed = prevspeed;
	}
	if(!boost){
		player.rotation = game.physics.arcade.moveToPointer(player, 60, game.input.activePointer, playerspeed);
	}else{
		player.rotation = game.physics.arcade.moveToPointer(player, 60, game.input.activePointer, boostspeed);
	}

	if(konacode){
		koCode();
		if(game.input.mousePointer.isDown && nbteleport >= 1 && !boosting && !game.pause && !reviving){
			boosting = true;
		}if(game.input.mousePointer.isUp && boosting && !reviving){
			boostage();
			boosting = false;
		}
	}else{
		pasKoCode();
	}

	if(i > 9999){
		i = 0;
	}

	if(nbsource<20 && i%30===0){

		if(game.rnd.integerInRange(0, 1)==1){
			posX = game.rnd.integerInRange(player.position.x-400-player.width, player.position.x-175-player.width);
		}else{
			posX = game.rnd.integerInRange(player.position.x+175+player.width, player.position.x+400+player.width);
		}
		if(game.rnd.integerInRange(0, 1)==1){
			posY = game.rnd.integerInRange(player.position.y-400-player.width, player.position.y-175-player.width);
		}else{
			posY = game.rnd.integerInRange(player.position.y+175+player.width, player.position.y+400+player.width);
		}

		if(game.rnd.integerInRange(0, 1) == 0){
			source = sourcesfiable.create(posX, posY, randArray(fiables));
			source.addChild(game.add.sprite(-source.width, -source.height, "pacman")).scale.setTo(4);
			source.children[0].animations.add('sourceanim', [game.rnd.integerInRange(12, 15)], 10, true);
			var color = "0000FF";
		}else{
			source = sourcesnonfiable.create(posX, posY, randArray(nonfiables));
			source.addChild(game.add.sprite(-source.width, -source.height, "pacman")).scale.setTo(4);
			var annim = game.rnd.integerInRange(0, 3);
			source.children[0].animations.add('sourceanim', [34+(annim*8), 35+(annim*8) ,38+(annim*8), 39+(annim*8)], 5, true);
			source.children[0].animations.add('sourceanimfear', [30, 31], 10, true);
			source.children[0].animations.add('sourceanimfearend', [30, 31, 34+(annim*8), 35+(annim*8)], 10, true);
			var color = "FF0000";
		}
		source.addChild(cercles(randArray(colors), 0.5, source, true));
		source.children[0].anchor.setTo(-source.width/300);
		source.children[0].animations.play("sourceanim");
		source.name = 'sourceanim';
		source.children[0].visible = false;
		source.scale.setTo(1);
		source.anchor.setTo(0.5);
		source.body.setCircle(source.width/2);
		nbsourceText.text = nbtext + nbsource;
	}
	if(i%15===0 && source){
		j=0;
		k=0;
		nbsource=0;
		sourcesfiable.forEach(function(e){
			if (e.alive) {
				e.checkWorldBounds = true;
				e.outOfBoundsKill = true;
				if(game.rnd.integerInRange(0, 1) == 1){
					if(game.rnd.integerInRange(1, 100) > 20){
						e.body.velocity.x = game.rnd.integerInRange(-200, 200);
						e.body.velocity.y = game.rnd.integerInRange(-200, 200);
					}else{
						e.body.velocity.x = game.rnd.integerInRange(-400, 400);
						e.body.velocity.y = game.rnd.integerInRange(-400, 400);
					}
				}
				nbsource++;
				nbsourceText.text = nbtext + nbsource;
			}
		});
		sourcesnonfiable.forEach(function(e){
			if (e.alive) {
				e.checkWorldBounds = true;
				e.outOfBoundsKill = true;
				if(game.rnd.integerInRange(0, 1) == 1){
					if(game.rnd.integerInRange(1, 100) > 5){
						e.body.velocity.x = game.rnd.integerInRange(-snonfiaspeed, snonfiaspeed);
						e.body.velocity.y = game.rnd.integerInRange(-snonfiaspeed, snonfiaspeed);
					}else{
						e.body.velocity.x = game.rnd.integerInRange(-snonfiaspeed+snonfiaspeed/4, snonfiaspeed+snonfiaspeed/4);
						e.body.velocity.y = game.rnd.integerInRange(-snonfiaspeed+snonfiaspeed/4, snonfiaspeed+snonfiaspeed/4);
					}
				}
				nbsource++;
				nbsourceText.text = nbtext + nbsource;
			}
			if(boost && e.name === 'sourceanim'){
				e.children[0].animations.play("sourceanimfear");
				e.name = 'sourceanimfear';
			}if(!boost && e.name === 'sourceanimfearend'){
				e.children[0].animations.play("sourceanim");
				e.name = 'sourceanim';
			}if(endboost && e.name === 'sourceanimfear'){
				e.children[0].animations.play("sourceanimfearend");
				e.name = 'sourceanimfearend';
			}
		});
	}
}


function teleport(){
	nbteleport--;
	nbTeleportText.text = teletext + nbteleport;
	player.x = game.input.mousePointer.worldX;
	player.y = game.input.mousePointer.worldY;
}
function boostage(){
	boostspeed = playerspeed/2;
	nbteleport--;
	nbTeleportText.text = teletext + nbteleport;
	boost = true;
	clearTimeout(boosttime);
	boosttime = setTimeout(function(){
		endboost = true;
		setTimeout(function(){
			endboost = false;
			boost = false;
		}, 2500);
	}, 7500);
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
	if(player.width < 160){
		player.width += player.width/20;
		player.height += player.height/20;
	}
	if(playerspeed < 3000 && !boost){
		playerspeed += playerspeed/25;
	}else if(!boost){
		playerspeed += playerspeed/120;
	}
	if(boost){
		boostspeed -= boostspeed/20;
	}
	snonfiaspeed += 5;
	player.body.setCircle(player.width);
	player.anchor.setTo((player.width)/32);
	scoreText.text = scortext + score;
}
function collideHandlerNonFiable(player, source){
	explosionfunc(player);
	player.kill();
}

function explosionfunc(sprite){

	randexplotabl = randArray(explosions);

	explosion = game.add.sprite(100, 100, randexplotabl[0]);
	explosion.animations.add('boom_left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 10, false);
	// explosion.fixedToCamera = true;
	game.physics.arcade.enable(explosion);
	explosion.enableBody = true;
	// explosion.x = sprite.worldX
	// explosion.y = sprite.worldY
	explosion.x = sprite.x;
	explosion.y = sprite.y;
	explosion.scale.setTo(randexplotabl[1]+score/6);
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
	// if(menu){
	// 	game.debug.body(menu);
	// }

	// if(sourcesfiable){
	// 	sourcesfiable.forEach(game.debug.body(sourcesfiable.this));
	// }
}

$(document).ready(function(){

	console.log('coucou');

})

