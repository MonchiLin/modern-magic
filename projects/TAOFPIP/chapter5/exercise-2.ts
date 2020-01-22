import "p5"

// Y 坐标
let y = 150

// 控制速度
let s = 0.4

function setup() {
  createCanvas(300, 300)
  smooth()
}

function draw() {
  fill(0, 20)
  rect(0, 0, width, height)

  // 递增重力
  // gravity 是和 y 成正比的，这意味这 y 越大 gravity 越大
  // 从而形成 y 靠近底部的时候看起来更快
  const gravity = abs(y * 0.1)

  /**
   * y 计算过程
   * 1. y = 150 + 0.8 * 15          = 162
   * 2. y = 162 + 0.8 * 16.2        = 174.96
   * 3. y = 174.96 + 0.8 * 17.496   = 188.9568
   * ..... y 到达了低部之后 (y >= 300 0)
   * 4. y = 300 + -0.8 * 30 = 270
   *
   *
   *
   */
  y = y + s * gravity

  // 如果 y 到达底部
  // 或者 y 到达顶部
  if ((y > height - 25 && s > 0) || (y < 25 && s < 0)) {
    // 取反 s, 取反 s 后 y 就会变小，y 变小重力（gravity）也会变小
    s = -s
  }

  fill(255)
  ellipse(150, y, 50, 50)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
