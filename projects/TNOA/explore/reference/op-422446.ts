import "p5"

let circle = 200;
let rot;
let col;
let r;

const freq = 0.000005;
const cont = 0;


function setup() {
  createCanvas(600, 600);
}

function draw() {
  clear();
  translate(width / 2, height / 2);
  rotate(radians(rot));

  ellipseMode(RADIUS);
  for (let i = 0; i < 500; i++) {
    circle = 200 + 50 * sin(millis() * freq * i);
    col = map(circle, 150, 250, 255, 60);
    r = map(circle, 150, 250, 5, 2);

    fill(col, 0, 74);
    noStroke();
    ellipse(circle * cos(i), circle * sin(i), r, r);
    rot = rot + 0.00005;
  }
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
