import "p5"
import Particle from "./particel"
import {range} from "ramda";

const total = 10

let particles: Particle[]

function setup() {
  createCanvas(640, 640)
  particles = range(0, total)
    .map(_ => new Particle(createVector(random(width), random(height))))

}

function draw() {
  background(255)
  particles.push(new Particle(createVector(width / 2, 50)))
  particles = particles.filter(p => !p.isDead)
    .map(p => {
      p.run()
      return p
    })
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
