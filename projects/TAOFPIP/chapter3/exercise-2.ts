import "p5"
import {range} from "ramda";

function setup() {
  createCanvas(300, 300)
  smooth()
}

function draw() {
  background(0)
  strokeWeight(20)

  for (let y = 30; y < 270; y += 10) {
    for (let x = 30; x < 270; x += 20) {

      stroke(y, x, 255)
      line(x, y, x + 10, y + 10)
    }
  }

  for (let y = 20; y < 260; y += 10) {
    for (let x = 30; x < 270; x += 20) {

      stroke(y, x, 255)
      line(x, y, x + 10, y + 10)
    }
  }

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
