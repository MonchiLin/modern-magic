import "p5"
import Mover from './mover'

let mover: Mover

function setup() {
  createCanvas(500, 500)
  mover = new Mover()
}

function draw() {
  const wind = createVector(0.01, 0)
  const gravity = createVector(0,0.1)

  mover.applyForce(wind)
  mover.applyForce(gravity)
  mover.update()
  mover.display()
  mover.checkEdge()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
