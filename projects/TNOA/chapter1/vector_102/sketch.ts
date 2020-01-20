import "p5"
import Vector from "./vector";

let location: Vector
let velocity: Vector

function setup() {
  createCanvas(640, 360);
  smooth()
  location = new Vector(100,100)
  velocity = new Vector(1,3.3)
}

function draw() {
  background(175)

  location.add(velocity)

  if ((location.x > width) || location.x < 0) {
    velocity.x *= -1
  }

  if ((location.y > height) || location.y < 0) {
    velocity.y *= -1
  }

  stroke(0)
  fill(175)
  ellipse(location.x, location.y, 16, 16)

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
