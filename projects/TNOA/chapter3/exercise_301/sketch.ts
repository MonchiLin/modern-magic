import "p5"

let angle = 0;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(220);
  translate(width * 0.5, height * 0.5)
  angle += 0.1
  rotate(angle)

  stroke(200)
  ellipse(-10, -10, 10, 10)
  line(-8, -8, 10, 10)
  ellipse(10, 10, 10, 10)


}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
