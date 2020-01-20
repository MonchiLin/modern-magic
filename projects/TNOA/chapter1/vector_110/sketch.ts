import "p5"
import Mover from "./mover";

let mover: Mover

function setup() {
  createCanvas(640, 360);
  smooth()
  mover = new Mover()
}

function draw() {
  mover.update()
  mover.checkEdges()
  mover.display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
