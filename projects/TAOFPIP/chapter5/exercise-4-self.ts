import "p5"

let r = 50 // 圆形与原点的距离
let angle = 0 // 当前圆的角度

function setup() {
  createCanvas(600, 600)
}

function draw() {
  const x = cos(angle) * r
  const y = sin(angle) * r

  translate(width / 2, height / 2)

  ellipse(x, y, r, r)
  angle += 1
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
