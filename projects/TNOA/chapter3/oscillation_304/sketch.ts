import "p5"

let r = 0
let theta = 0

function setup() {
  createCanvas(640, 360);
}

function draw() {
  translate(width / 2, height / 2)

  const x = r * cos(theta)
  const y = r * sin(theta)

  noStroke()
  fill(0)
  ellipse(x, y, 16, 16)

  r += 0.5
  theta += 0.05
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
