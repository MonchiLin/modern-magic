import "p5"
import Vector2 from "./vector2";

function setup() {
  createCanvas(640, 360);
  smooth()
}

function draw() {
  background(175)
  const center = new Vector2(width / 2, height / 2)
  const mouse50 = new Vector2(mouseX, mouseY)
  mouse50.sub(center)
  mouse50.normalize()
  mouse50.mult(20)

  translate(width / 2, height / 2)
  line(0, 0, mouse50.x, mouse50.y)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
