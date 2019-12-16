import "p5"
import Mover from './mover'

let mover: Mover

function setup() {
  mover = new Mover()
  createCanvas(500, 500)
}

function draw() {
  const wind = createVector(0.002, 0.002)
  mover.applyForce(wind)
  mover.update()
  mover.display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
