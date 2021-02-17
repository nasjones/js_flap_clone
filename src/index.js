import Phaser from "phaser";

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,

	physics: {
		default: "arcade",
		arcade: {
			gravity: {
				// y: 400,
			},
			debug: true,
		},
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
};

let bird = null;
let totalDelta = null;
let pipeTop = null;
let pipeBottom = null;
const PIPE_VERT_DIST = [120, 270];
const PIPE_HORI_DIST = [220, 400];
const FLAPVELOCITY = 250;
const BIRDORIGIN = { x: config.width * 0.1, y: config.height / 2 };
const PIPES_TO_RENDER = 4;

function preload() {
	this.load.image("sky", "/assets/sky.png");
	this.load.image("bird", "/assets/bird.png");
	this.load.image("pipe", "/assets/pipe.png");
}

function create() {
	this.add.image(0, 0, "sky").setOrigin(0);

	bird = this.physics.add
		.sprite(BIRDORIGIN.x, BIRDORIGIN.y, "bird")
		.setOrigin(0);

	bird.body.gravity.y = 400;
	// bird.body.velocity.x = 100;
	bird.body.collideWorldBounds = true;
	this.input.on("pointerdown", flap);
	this.input.keyboard.on("keydown_SPACE", flap);

	for (
		let i = 0, pipex = 400;
		i < PIPES_TO_RENDER;
		i++, pipex += Phaser.Math.Between(...PIPE_HORI_DIST)
	) {
		let pipeSpace = Phaser.Math.Between(...PIPE_VERT_DIST);
		let pipeStart = Phaser.Math.Between(20, config.height - pipeSpace);
		pipeTop = this.physics.add
			.sprite(pipex, pipeStart, "pipe")
			.setOrigin(0, 1);
		pipeBottom = this.physics.add
			.sprite(pipex, pipeTop.y + pipeSpace, "pipe")
			.setOrigin(0);
		pipeTop.body.velocity.x = -200;
		pipeBottom.body.velocity.x = -200;
		this.physics.add.collider(bird, pipeTop, restartBird);
		this.physics.add.collider(bird, pipeBottom, restartBird);
	}
}

function update() {
	if (bird.body.blocked.none == false) {
		restartBird();
	}
	// game.physics.arcade.collide(bird, pipeTop);
	// game.physics.arcade.collide(bird, pipeBottom);
}

function restartBird() {
	alert("you lost");
	bird.body.y = BIRDORIGIN.y;
	bird.body.velocity.y = 0;
}

function flap() {
	bird.body.velocity.y -= FLAPVELOCITY;
}

function spawnPipe() {}
new Phaser.Game(config);

// ('./assets/sky.png')

// import Phaser from "phaser";

// const config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 200 }
//     }
//   },
//   scene: {
//     preload: preload,
//     create: create
//   }
// };

// new Phaser.Game(config);

// function preload () {
//   this.load.image('sky', 'assets/sky.png');
// }

// function create () {
//   this.add.image(400, 300, 'sky');
// }
