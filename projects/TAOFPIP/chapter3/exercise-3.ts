import "p5"

function setup() {
  createCanvas(350, 350)
  smooth()

  frameRate(1)
}

function draw() {
  background(255)
  noFill()

  for (let d = 0; d < 75; d += 4) {
    for (let x = 0; x < 350; x += 75) {
      for (let y = 0; y < 350; y += 75) {
        stroke(random(255), random(255), 255)
        strokeWeight(4)
        ellipse(x, y, d, d)
      }
    }
  }

  stroke(0)
  strokeWeight(10)
  line(75, 75, 79, 79)
  line(0, 75, 0, 75)

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
