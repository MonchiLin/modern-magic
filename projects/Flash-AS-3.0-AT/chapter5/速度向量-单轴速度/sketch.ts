// 线性垂直运动

import "p5"
import Ball from "./ball";

let ball: Ball

function setup() {
  createCanvas(640, 360);
  ball = new Ball()
}

function draw() {
  clear()
  ball.update()
  ball.display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
