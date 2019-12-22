import "p5"

let angle = 0

function setup() {
  createCanvas(640, 360);
}

function draw() {
  // 为什么要先 translate 在 rotate
  // 原因在于 rotate 是基于原点(origin point) 旋转的
  // 默认圆心点在0，0也就是左上角
  // translate(width / 2, height / 2) 后原点变成了 canvas 中心
  translate(width / 2, height / 2);

  angle += 0.01
  rotate(angle)
  rect(0, 0, 25, 25)
  translate(25, 25);
  rect(0, 0, 25, 25)
  translate(25, 25);
  rect(0, 0, 25, 25)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
