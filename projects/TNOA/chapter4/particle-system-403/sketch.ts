import "p5"
import Particle from "./particel"
import {range} from "ramda";
import ParticleSystem from "./particel-system";

const total = 10

let particleSystem: ParticleSystem

function setup() {
  createCanvas(640, 640)
  particleSystem = new ParticleSystem(createVector(width / 2, height / 2))
}

function draw() {
  background(255)
  particleSystem.run()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
