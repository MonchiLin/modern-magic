import "p5"

function setup() {
  createCanvas(640, 360);
  for (let angle = 0; angle < TAU; angle += 0.1) {
    console.log(sin(angle))
  }
}

function draw() {

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
