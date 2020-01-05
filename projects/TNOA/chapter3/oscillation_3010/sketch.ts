import "p5"
import Pendulum from "./pendulum";

let pendulum: Pendulum

function setup() {
  createCanvas(640, 360);
  pendulum = new Pendulum(createVector(width / 2, height / 2), 150)
}

function draw() {
  clear()
  pendulum.go()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
