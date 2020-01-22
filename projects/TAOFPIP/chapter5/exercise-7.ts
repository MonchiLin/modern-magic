import "p5"

// 角度
let angle = 0

function setup() {
  createCanvas(300, 300)
  smooth()
  background(255)
  colorMode(HSB, 360, 100, 100)
}

function draw() {
  fill(0, 0, 100, 3)
  rect(0, 0, 300, 300)
  angle += 0.1
  translate(mouseX, mouseY)
  rotate(angle)
  fill(random(360), 100, 100)
  line(-50, 0, 50, 0)
  ellipse(-50, 0, 10, 10)
  ellipse(50, 0, 10, 10)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
