import "p5"

const ROW = 30
const COLUMN = 30

function setup() {
  createCanvas(600, 600)
  smooth()
  background(200)
}

function draw() {
  fill(255, 255, 0)
  rect(mouseX, mouseY, 50, 50)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
