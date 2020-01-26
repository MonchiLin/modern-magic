import "p5"
import GridSystem from "./grid-system";

let gs: GridSystem

function setup() {
  createCanvas(500, 500);
  gs = new GridSystem(10, 10, 50)
}


function draw() {
  background(16)
  gs.run()
}


// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
