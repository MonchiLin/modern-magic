import "p5"


// 周期，完成一次往复运动所花费的时间， 单位： 帧
let period = 120

// 振幅，离开运动中心的最大距离
let amplitude = 100

function setup() {
  createCanvas(640, 360);
}

function draw() {
  translate(width / 2, height / 2)

  const x = amplitude * cos(TWO_PI * frameCount / period)

  stroke(0)
  fill(175)
  line(0, 0, x, 0)
  ellipse(x, 0, 20, 20)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
