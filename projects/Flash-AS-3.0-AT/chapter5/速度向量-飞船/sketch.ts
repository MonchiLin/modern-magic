import "p5"
import ShipSim from "./ship-sim";

let shipSim: ShipSim

function setup() {
  createCanvas(500, 500);
  shipSim = new ShipSim()
}

function draw() {
  clear()
  shipSim.display()
  shipSim.update()
}

function keyPressed(e) {
  shipSim.onKeyDown(e)
}

function keyReleased(e) {
  shipSim.onKeyUp(e)
}

// @ts-ignore
window.setup = setup
// @ts-ignore
window.draw = draw
// @ts-ignore
window.keyPressed = keyPressed
// @ts-ignore
window.keyReleased = keyReleased
