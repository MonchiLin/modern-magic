import "p5"

let blockNumHori = 25;
let blockNumHoriTarget;
let circleRadius = 20.0;

function setup() {
  createCanvas(1600, 960);
  background(255)
  blockNumHoriTarget = blockNumHori
}

function draw() {

  fill(255, 50);
  noStroke();
  rect(0, 0, width, height);

  blockNumHori = round(lerp(blockNumHori, blockNumHoriTarget, 0.1));
  const blockWidth = width / blockNumHori
  const blockNumVert = floor(height / blockWidth) + 1;

  fill(255, 255, 0, 255);
  noStroke();

  for (let rowIndex = 0; rowIndex < blockNumHori; rowIndex++) {
    for (let colIndex = 0; colIndex < blockNumVert; colIndex++) {
      const horiPos = rowIndex + 0.5 * blockWidth
      const vertPos = colIndex + 0.5 * blockWidth

      const angle = radians(horiPos + vertPos) / 8 + (millis() / 180.0 * PI / 8);
      let rx = blockWidth / 3 * cos(angle);
      let ry = blockWidth / 3 * sin(angle);
      fill(255, 0, 0, 255);
      circle(horiPos + rx, vertPos + ry, blockWidth / 3);
      fill(0, 255, 0.50);
    }
  }
}

function mouseMoved() {
  blockNumHoriTarget = round(map(mouseX, 0, width, 10, 30));
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw

// @ts-ignore
window.mouseMoved = mouseMoved
