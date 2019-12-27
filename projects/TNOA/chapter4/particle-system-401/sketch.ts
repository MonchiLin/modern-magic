import "p5"
import Particle from "./particel"

let particle: Particle

function setup() {
  createCanvas(640, 360);
  smooth()

  particle = new Particle(createVector(width / 2, height / 2))
}

function draw() {
  particle.run()

  if (particle.isDead) {
    console.log("particle dead")
  }
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
