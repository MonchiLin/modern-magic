import "p5"
import Particle from "./particel"

let particle:Particle

function setup() {
  createCanvas(640, 640)
  particle = new Particle(createVector(width / 2, height / 2))
}

function draw() {
  if (!particle.isDead) {
    particle.run()
  }
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
