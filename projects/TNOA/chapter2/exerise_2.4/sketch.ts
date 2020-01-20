import "p5"
import Mover from './mover'

let mover: Mover

function setup() {
  createCanvas(600, 600)
  mover = new Mover(45, 0, 0)
}

function draw() {
  rectMode(CENTER)
  clear()

  mover.checkSlowDownArea()
  mover.update()
  mover.checkEdge()
  mover.display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
