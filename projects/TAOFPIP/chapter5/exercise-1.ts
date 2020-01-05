import "p5"

let x = 0
let acceleration = 5

function setup() {
  createCanvas(300, 300)
}

function draw() {
  clear()
  ellipse(x, 150, 20, 20)
  x += acceleration
  if (x >= width || x <= 0) {
    acceleration *= -1
  }
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
