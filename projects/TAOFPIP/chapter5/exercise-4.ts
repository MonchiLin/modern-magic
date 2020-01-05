import "p5"

let r = 50 // 圆形与原点的距离
let angle = 0 // 当前圆的角度

function setup() {
  createCanvas(300, 300)
  background(0)
  smooth()
  stroke(255)
  fill(0)
}

function draw() {
  translate(width / 2, height / 2)
  const x = cos(angle) * r
  const y = sin(angle) * r

  ellipse(x, y, 50, 50)
  point(x,y)
  angle += 0.1
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
