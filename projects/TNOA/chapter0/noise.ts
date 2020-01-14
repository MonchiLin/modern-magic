import "p5"

let t = 3

function setup() {
  createCanvas(640, 360);
}

function draw() {
  console.log(noise(t))
  t += 0.0001
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
