import "p5"

// 正弦曲线公式
// Y = Amplitude * Sin( Period + X)

const FRAME_COUNT = 60

// 周期，完成一次往复运动所花费的时间， 单位： 帧
let period = 30

// 振幅，离开运动中心的最大距离
let amplitude = 80

function setup() {
  createCanvas(640, 360);
  frameRate(FRAME_COUNT)
}

function draw() {
  translate(0, height / 2)

  // if (frameCount <= 0) {
  //   beginShape(LINES)
  // }
  //
  // if (frameCount >= FRAME_COUNT * 10) {
  //   endShape()
  // }

  const x = frameCount
  const y = amplitude * sin(radians(x + period))

  // vertex(x, y)
  point(x, y)


}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
