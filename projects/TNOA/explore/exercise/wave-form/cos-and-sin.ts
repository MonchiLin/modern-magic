import "p5"

// 正弦曲线公式
// Y = Amplitude * Sin( Period + X)

const FRAME_COUNT = 120

// 周期，完成一次往复运动所花费的时间， 单位： 帧
const period = 60

// 振幅，离开运动中心的最大距离
const amplitude = 35

let angle = 0

function setup() {
  createCanvas(640, 640);
  frameRate(FRAME_COUNT)
}

function draw() {

  fill(0xffffff)

  ellipse(
    frameCount,
    height / 2 - amplitude / 2 + sin(angle) * amplitude,
    10,
    10,
  )

  fill(0xffffff)

  ellipse(
    frameCount,
    height / 2 - amplitude / 2 + cos( angle) * amplitude,
    10,
    10,
  )

  angle += PI / 18
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
