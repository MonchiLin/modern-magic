import "p5"

let y = 150
let s = 0.8

function setup() {
  createCanvas(300, 300)
  smooth()
}

function draw() {
  fill(0, 20)
  rect(0, 0, width, height)
  const gravity = abs(y * 0.1)
  y += s * gravity
  if ((y > height - 25 && s > 0) || (y < 25 && s < 0)) {
    s = -s
  }
  fill(255)
  ellipse(150, y, 50, 50)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
