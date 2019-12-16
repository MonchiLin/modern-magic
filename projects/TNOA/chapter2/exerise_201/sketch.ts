import "p5"
import Mover from './mover'

let mover: Mover

function setup() {
  createCanvas(500, 500)
  mover = new Mover()
}

function draw() {
  mover.update()
  mover.display()
  mover.checkEdge()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
