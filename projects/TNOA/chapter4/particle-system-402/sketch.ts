import "p5"
import {range} from "ramda";
import Particle from "./particle";


const ranges = range(0, 10)
let particles: Particle[] = []

function setup() {
  createCanvas(640, 360);
  smooth()

  ranges.forEach(i => {
    particles.push(new Particle(createVector(random(width / 2), random(height / 2))))
  })
}

function draw() {
  particles.push(new Particle(createVector(random(width / 2), random(height / 2))))
  particles.forEach((p, i) => {
    p.run()
    if (p.isDead) {
      particles.splice(i, 1)
    }
  })
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
