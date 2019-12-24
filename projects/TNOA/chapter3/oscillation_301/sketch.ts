import "p5"
import Mover from "./mover";

// 角度转换弧度 2PI * 角度除以 360°
const toRadians = (angle) => 2 * Math.PI * (angle / 360)

// 弧度转换角度 弧度 * 360 除以 2PI
const toDegrees = (radian) => radian * 360 / (2 * Math.PI)

let mover: Mover

function setup() {
  createCanvas(640, 360);
  mover = new Mover(width * .5, height * .5, 2)
}

function draw() {
  background(255);

  mover.applyForce(createVector(0.01, 0))
  mover.update()
  mover.display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
