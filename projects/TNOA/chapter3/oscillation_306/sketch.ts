import "p5"

let angle = 0
let aVelocity = 0.05

function setup() {
  createCanvas(640, 360);
}

function draw() {
  translate(width / 2, height / 2)

  const amplitude = 100
  const x = amplitude * cos(angle)

  angle += aVelocity
  ellipseMode(CENTER)
  stroke(0)
  fill(175)
  line(0, 0, x, 0)

  ellipse(x, 0, 20, 20)

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
