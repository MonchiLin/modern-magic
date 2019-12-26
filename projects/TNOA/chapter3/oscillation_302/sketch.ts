import "p5"
import Mover from "./mover";

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
