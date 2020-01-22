import "p5"

function setup() {
  createCanvas(300, 300)
}

function draw() {
  background(204)
  const ms = millis()
  const s = second()
  const m = minute()
  const h = hour()

  fill(255, 0, 0)
  rect(ms / 100, 0, 30, 70)

  fill(0, 255, 0)
  rect(s * 2, 75, 30, 70)

  fill(0, 0, 255)
  rect(m, 150, 30, 70)

  fill(0, 255, 255)
  rect(h, 225, 30, 70)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
