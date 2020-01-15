import "p5"
import Mover from './mover'

const movers: Mover[] = new Array(20)

function setup() {
  createCanvas(500, 500)

  for (let i = 0; i < movers.length; i++) {
    movers[i] = new Mover(random(0.1, 2), random(0, width), random(0, height))
  }
}

function draw() {
  const wind = createVector(0.02, 0.02)

  for (let i = 0; i < movers.length; i++) {
    const m = movers[i].mass
    const gravity = createVector(0, 0.1 * m)

    movers[i].applyForce(wind)
    movers[i].applyForce(gravity)
    movers[i].update()
    movers[i].display()
    movers[i].checkEdge()
  }
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
