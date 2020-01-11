import "p5"

function setup() {
  createCanvas(640, 360);
  background(177)
}

function draw() {
  let xloc = randomGaussian(width / 2, 60);

  fill(0, 10);
  noStroke();
  ellipse(xloc, height / 2, 16, 16);   // Draw an ellipse at our "normal" random position

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
