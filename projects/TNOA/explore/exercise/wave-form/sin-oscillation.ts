import "p5"

// 正弦曲线公式
// Y = Amplitude * Sin( Period + X)

const FRAME_COUNT = 120

// 周期，完成一次往复运动所花费的时间， 单位： 帧
let period = 60

// 振幅，离开运动中心的最大距离
let amplitude = 80

function setup() {
  createCanvas(640, 640);
  frameRate(FRAME_COUNT)
}

// function draw() {
//   translate(0, height / 2)
//   const x = frameCount
//   const y = amplitude * sin(TAU * frameCount / period)
//   point(x, y)
// }

function draw() {
  background(16)

  translate(50, 0)


  let angle = 0

  for (let x = 0; x < width; x += 5) {

    //       Y 的起点
    const y1 = 40 + (sin(angle) * 40)
    const y2 = 140 + (sin(angle + QUARTER_PI) * 40)
    const y3 = 240 + (sin(angle + HALF_PI) * 40)
    rect(x, y1, 2, 4)
    rect(x, y2, 2, 4)
    rect(x, y3, 2, 4)
    angle += PI / 40
  }

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
