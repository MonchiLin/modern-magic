import "p5"

let angle = 0;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(angle);
  translate(width / 2, height / 2)
  rotate(radians(angle))
  angle += 1

  point(100, 100)

  fill(175)
  line(0, 0, 50, 50)
  ellipse(0, 0, 20, 20)
  ellipse(50, 50, 20, 20)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
