import "p5"
import Mover from './mover'

let mover: Mover

function setup() {
  createCanvas(500, 500)
  mover = new Mover()
}

function draw() {
  mover.applyForce(createVector(0.002, 0.002))
  mover.update()
  mover.display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
