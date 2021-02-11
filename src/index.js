import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
function preload() {
  this.load.image("sky", "./assets/sky.png");
  this.load.image("bird", "/assets/bird.png");
  // this.load.spritesheet("bird", "./assets/birdSprite.png", {
  //   frameWidth: 30,
  //   frameHeight: 30,
  // });
}

let bird = null;
function create() {
  // this.add.image(config.width / 2, config.height / 2, "sky");
  this.add.image(0, 0, "sky").setOrigin(0);
  // this.add.image(400, 300, "sky").setOrigin(0, 0);

  bird = this.physics.add
    .sprite(config.width * 0.1, config.height / 2, "bird")
    .setOrigin(0);

  // console.log(bird.body);
  // bird.body.velocity.y = 200;
}

function update(time, delta) {
  // for (let i = 0; i > -1; i += 1) {
  //   console.log(`hello ${i}`);
  //   // if(key)
  //   setTimeout(function () {
  //     i = -1;
  //   }, 1000);
  // }
  // console.log(bird.body.velocity.y);
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
