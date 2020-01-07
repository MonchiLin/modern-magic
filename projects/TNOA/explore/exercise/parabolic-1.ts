import "p5"

// 对称轴竖直抛物线方程
// y = pow(a(y - h),2) + k

// 水平轴竖直抛物线方程
// x = pow(a(x - h),2) + k

const a = -0.333333333

let top: p5.Vector

function setup() {
  createCanvas(640, 360);
  top = createVector(2, 3)
}

function draw() {

  // const x = Math.PI

  // ellipse()

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
