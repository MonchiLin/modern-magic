import "p5"

const ROW = 30
const COLUMN = 30

function setup() {
  createCanvas(300, 300)
  frameRate(1)
}

function draw() {
  clear()
  fill(0)
  for (let x = 0; x < ROW; x++) {
    for (let y = 0; y < COLUMN; y++) {
      console.log(x * 30, y * 30)
      rect(x * 30, y * 30, 29, 29)
    }
  }
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
