import "p5"
import ParticleSystem from "./particel-system";
import Repeller from "./repeller";

let particleSystem: ParticleSystem
let repeller: Repeller

function setup() {
  createCanvas(640, 640)
  particleSystem = new ParticleSystem(createVector(width / 2, 50))
  repeller = new Repeller(createVector(width / 2, height / 2))
}

function draw() {
  background(255)
  particleSystem.addParticle()
  particleSystem.applyForce(createVector(0, 0.1))
  particleSystem.applyRepeller(repeller)
  particleSystem.run()
  repeller.display()
}

function mousePressed() {
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw

// @ts-ignore
window.mousePressed = mousePressed
