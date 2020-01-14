import "p5"

let t = 0

function setup() {
  createCanvas(640, 360);
}

function draw() {
  const value = noise(t)
  // 参数作用
  // 1. 原始值
  // 2，3. 原始的范围（最大值和最小值）
  // 4，5. 新值的范围（最大值和最小值）
  const x = map(value, 0, 1, 0, width)
  ellipse(x, height / 2, 16, 16)
  t += 0.01
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
