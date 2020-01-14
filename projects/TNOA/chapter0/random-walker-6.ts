import "p5"


function setup() {
  createCanvas(640, 360);

}

function draw() {
  loadPixels()

  let xoff = 0.0
  for (let x = 0; x < width; x++) {
    let yoff = 0.0

    for (let y = 0; y < height; y++) {
      const bright = map(noise(xoff, yoff, 10), 0, 1, 0, 255)

      pixels[x + y * width] = bright

      yoff += 0.01
    }
    xoff += 0.01
  }

  updatePixels()

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
