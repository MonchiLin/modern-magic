import "p5"

// 角度转换弧度 2PI * 角度除以 360°
const toRadians = (angle) => 2 * Math.PI * (angle / 360)

// 弧度转换角度 弧度 * 360 除以 2PI
const toDegrees = (radian) => radian * 360 / (2 * Math.PI)

let angle = 0

let aVelocity = 0

let aAcceleration = 0.001

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);

  fill(175)
  stroke(0)
  rectMode(CENTER)
  translate(width / 2, height / 2)
  rotate(angle)

  line(-50, 0, 50, 0)
  ellipse(50, 0, 8, 8)
  ellipse(-50, 0, 8, 8)

  angle += aVelocity
  aVelocity += aAcceleration
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
