// 平滑的上下运动

import "p5"
import Ball from "../shared/ball";

let ball: Ball

function setup() {
  createCanvas(640, 360);
  ball = new Ball()
}

function draw() {
  ball.update()
  ball.display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
