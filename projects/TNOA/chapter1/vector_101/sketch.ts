import "p5"

let x = 100
let y = 100
let xSpeed = 1
let ySpeed = 3.3

function setup() {
  createCanvas(640, 360);
  smooth()
}

function draw() {
  background(175)

  x += xSpeed
  y += ySpeed

  if ((x > width) || x < 0) {
    xSpeed *= -1
  }

  if ((y > height) || y < 0) {
    ySpeed *= -1
  }

  stroke(0)
  fill(175)
  ellipse(x, y, 16, 16)

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
