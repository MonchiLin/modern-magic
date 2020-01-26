import "p5"

let angle = 0.01

let a = 0.01

function setup() {
  createCanvas(360, 360);
}

function draw() {
  background(12)
  translate(width / 2,height/2)

  rotate(angle)

  angle += a
  if (angle >= HALF_PI || angle <= 0) {
    a = a * -1
  }

  rect(0, 0, 30, 30)
}

/**
 * 1 rad = （180 / PI）°
 * 1°    = （PI / 180）rad
 *
 *
 * @param x
 * @param y
 * @param radius1
 * @param radius2
 * @param npoints
 */
function star(x, y, radius1, radius2, npoints) {
  // 根据 360° = 2PI 可得每个角的度数
  let angle = TWO_PI / npoints;
  // 角度的一半
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
