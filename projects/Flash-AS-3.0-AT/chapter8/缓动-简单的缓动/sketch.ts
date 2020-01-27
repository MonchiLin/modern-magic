import "p5"

let ball: p5.Vector

const easing = 0.05

function setup() {
  createCanvas(500, 500);
  ball = createVector(width / 2, height / 2)
}

function draw() {
  const mouse = createVector(
    mouseX - ball.x,
    mouseY - ball.y,
  )
  const velocity = createVector(
    mouse.x * easing,
    mouse.y * easing
  )

  ball.add(velocity)
  ellipse(ball.x, ball.y, 20, 20)
  
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
