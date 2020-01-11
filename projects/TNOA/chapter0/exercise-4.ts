import "p5"

function setup() {
  createCanvas(640, 360);
}

function draw() {
  clear()
  for (let i = 0; i < 100; i++) {
    const x = randomGaussian(width / 2, width / 4)
    const y = randomGaussian(height / 2, height / 4)

    fill(random(0, 256), random(0, 256), random(0, 256))

    ellipse(x, y, 5, 5)
  }

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
