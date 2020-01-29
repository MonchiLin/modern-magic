import "p5"

// 正弦曲线公式
// Y = Amplitude * Sin( Period + X)

const FRAME_COUNT = 120

// 周期，完成一次往复运动所花费的时间， 单位： 帧
const period = 60

// 振幅，离开运动中心的最大距离
const amplitude = 35

const offset = 50

let angle = 0

function setup() {
  createCanvas(640, 640);
  frameRate(20)
}

function draw() {
  clear()

  beginShape(TRIANGLE_STRIP)

  for (let x = 4; x < width + 5; x += 5) {

    const y = sin(angle) * amplitude

    if ((x % 2) === 0) {
      vertex(x, offset + y)
    } else {
      vertex(x, offset - y)
    }
    angle += PI / 56
  }

  endShape()

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
