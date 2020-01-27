import "p5"

const friction = 0.8
let velocity: p5.Vector
let ball: p5.Vector

function setup() {
  createCanvas(500, 500);
  ball = createVector(width / 2, height / 2)
  velocity = createVector(random(0, 10) - 5, random(0, 10) - 5)
}

function draw() {
  // 获取速度向量的速度（长度）
  let speed = velocity.mag()
  // 获取加速度的角度
  const angle = atan2(velocity.y, velocity.x)

  // 如果速度大于摩擦力
  if (speed > friction) {
    speed -= friction
  } else {
    speed = 0
  }

  // 新的速度向量
  velocity = createVector(cos(angle) * speed, sin(angle) * speed)

  ball.add(velocity)
  ellipse(ball.x, ball.y, 20, 20)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
