import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  physics: {
    default: "arcade",
    arcade: {
      // gravity: {
      //   y: 200,
      // },
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
const VELOCITY = 200;

function preload() {
  this.load.image("sky", "./assets/sky.png");
  this.load.image("bird", "/assets/bird.png");
}

function create() {
  this.add.image(0, 0, "sky").setOrigin(0);

  bird = this.physics.add
    .sprite(config.width * 0.1, config.height / 2, "bird")
    .setOrigin(0);

  bird.body.velocity.x = VELOCITY;
  console.log(bird.body);
}

function update(time, delta) {
  if (bird.body.x >= config.width - bird.width) {
    bird.body.velocity.x = -VELOCITY;
  } else if (bird.body.x <= 0) {
    bird.body.velocity.x = VELOCITY;
  }
  // totalDelta += delta;
  // if (totalDelta < 1000) {
  //   return;
  // }
  // console.log(bird.body.velocity.y);
  // totalDelta = 0;
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
