import "p5"
import ParticleSystem from "./particel-system";

let particleSystems: ParticleSystem[] = []

function setup() {
  createCanvas(640, 640)
}

function draw() {
  background(255)
  particleSystems.forEach(ps => {
    ps.applyForce(createVector(0, 0.08))
    ps.run()
  })
}

function mousePressed() {
  particleSystems.push(new ParticleSystem(createVector(mouseX, mouseY)))
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw

// @ts-ignore
window.mousePressed = mousePressed
