import "p5"


// 周期，完成一次往复运动所花费的时间， 单位： 帧
let period = 120
// 使用帧作为周期

// 振幅，离开运动中心的最大距离
let amplitude = 100


function setup() {
  createCanvas(640, 360);
  frameRate(60)
}

function draw() {
  translate(width / 2, height / 2)

  // amplitude 是一个常量可以忽略不及
  // frameCount / period 用于计算周期

  const w = frameCount / period
  if (Number.isInteger(w)) {
    console.log(w)
  }

  // 每次 frameCount 都会增长，如果 当前位置 / 一个周期 得出值
  // 为整数则表示完成了一个周期，2PI 则表示余弦函数的周期

  const x = amplitude * tan(PI * frameCount / period)

  stroke(0)
  fill(175)
  line(0, 0, x, 0)
  ellipse(x, 0, 20, 20)
  ellipse(amplitude * cos(TWO_PI * frameCount / period), 50, 20, 20)
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
