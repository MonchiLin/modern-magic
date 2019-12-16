import "p5"
import Mover from './mover'

let mover: Mover

function setup() {
  mover = new Mover()
  createCanvas(500, 500)
}

function draw() {
  mover.applyForce(createVector(0.01,0.1))
  mover.update()
  mover.display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
