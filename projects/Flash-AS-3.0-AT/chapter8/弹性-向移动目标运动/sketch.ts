import "p5"

let ball: p5.Vector
let velocity: p5.Vector

let target
const spring = 0.1
const friction = 0.95

function setup() {
  createCanvas(500, 500);
  ball = createVector(0)
  velocity = createVector(0, 0)
  target = createVector(width / 2, height / 2)
}

function draw() {
  clear()

  const d = createVector(
    mouseX - ball.x,
    mouseY - ball.y,
  )

  const acceleration = createVector(
    d.x * spring,
    d.y * spring,
  )

  velocity.add(acceleration)
    .mult(friction)

  ball.add(velocity)
  ellipse(ball.x, ball.y, 20, 20)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
