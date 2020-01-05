import "p5"

let r = 10 // 圆形与原点的距离
let angle = 0 // 当前圆的角度
let diameter = 15 // 圆的直径

function setup() {
  createCanvas(300, 300)
  background(0)
  smooth()
  noStroke()
  fill(255)
}

function draw() {
  translate(width / 2, height / 2)
  const x = cos(angle) * r
  const y = sin(angle) * r

  ellipse(x, y, diameter, diameter)
  point(x,y)
  angle += 0.05
  r += 0.15
  diameter -= 0.01
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
