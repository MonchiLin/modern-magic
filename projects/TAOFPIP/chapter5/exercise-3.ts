import "p5"

let x
let y

function setup() {
  createCanvas(300, 300)
  frameRate(30)
  smooth()
  background(0)
  fill(255)
  stroke(0)
}

function draw() {
  x += random(-5, 5)
  y += random(-5, 5)
  ellipse(x, y, 30, 30)
}

function mousePressed() {
  x = mouseX
  y = mouseY
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw

// @ts-ignore
window.mousePressed = mousePressed
