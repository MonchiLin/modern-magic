import "p5"

function setup() {
  createCanvas(360, 360);
}

function draw() {
  background(12)


  beginShape()
  vertex(0,0)
  vertex(20,40)
  vertex(40,60)
  endShape()

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
