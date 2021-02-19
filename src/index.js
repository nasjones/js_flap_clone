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
let pipes = null;

const PIPE_VERT_DIST = [100, 200];
const PIPE_HORI_DIST = [300, 400];
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
	bird.body.collideWorldBounds = true;

	this.input.on("pointerdown", flap);
	this.input.keyboard.on("keydown_SPACE", flap);
	this.input.keyboard.on("keydown-P", () => {
		// console.log("working");
		this.scene.pause();
	});

	pipes = this.physics.add.group();

	for (let i = 0; i < PIPES_TO_RENDER; i++) {
		const hiPipe = pipes.create(0, 0, "pipe").setOrigin(0, 1);
		const lowPipe = pipes.create(0, 0, "pipe").setOrigin(0, 0);

		this.physics.add.collider(bird, hiPipe, resetBird);
		this.physics.add.collider(bird, lowPipe, resetBird);

		spawnPipe(hiPipe, lowPipe);
	}

	pipes.setVelocityX(-200);
}

function update() {
	if (bird.body.blocked.none == false) {
		resetBird();
	}
	recyclePipes();
}

function resetBird() {
	alert("you lost");
	bird.body.y = BIRDORIGIN.y;
	bird.body.velocity.y = 0;
}

function flap() {
	bird.body.velocity.y -= FLAPVELOCITY;
}

function spawnPipe(hiPipe, lowPipe) {
	const rightMostX = getRightMostPipe();
	const pipeSpace = Phaser.Math.Between(...PIPE_VERT_DIST);
	const pipeY = Phaser.Math.Between(25, config.height - pipeSpace - 25);
	const pipeX = Phaser.Math.Between(...PIPE_HORI_DIST);

	hiPipe.x = rightMostX + pipeX;
	hiPipe.y = pipeY;

	lowPipe.x = hiPipe.x;
	lowPipe.y = hiPipe.y + pipeSpace;

	hiPipe.body.immovable = true;
	lowPipe.body.immovable = true;
}

function recyclePipes() {
	const tempPipes = [];
	pipes.getChildren().forEach((pipe) => {
		if (pipe.getBounds().right <= 0) {
			tempPipes.push(pipe);
			if (tempPipes.length == 2) {
				spawnPipe(...tempPipes);
			}
		}
	});
}

function getRightMostPipe() {
	let rightMostX = 0;
	pipes.getChildren().forEach((pipe) => {
		rightMostX = Math.max(pipe.x, rightMostX);
	});
	return rightMostX;
}

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
