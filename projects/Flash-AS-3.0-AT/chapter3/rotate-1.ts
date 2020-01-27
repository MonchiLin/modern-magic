import "p5"
import Arrow from "../shared/arrow";

function setup() {
  createCanvas(640, 360);
}

function draw() {
  new Arrow().display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
