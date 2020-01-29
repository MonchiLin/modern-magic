import p5 from "p5";

class Grid {
  // 波动
  waveWidth: number
  // 格子的中心位置
  xPos: number
  yPos: number


  phase: number
  // 初相 - 运动初始位置
  startPhase: number
  phaseStep: number

  // 旋转弧度（控制图像水平或者垂直）
  theta: number
  // 振幅 - 振动的幅度，幅度越大距离中心点越远
  amplitude: number
  // 周期 - 完成一次运动的时间
  period: number

  c: p5.Color

  constructor(rowIndex: number, colIndex: number, public size: number) {
    this.waveWidth = size * 0.8

    this.xPos = rowIndex * size + size / 2
    this.yPos = colIndex * size + size / 2

    // TAU === TWO_PI === PI * 2
    // 随机产生周期
    this.period = TAU * pow(2, random(5))

    // 随意给一个振幅的值
    this.amplitude = map(noise(rowIndex, colIndex), 0, 1, 0, 20)

    // 初相
    this.startPhase = 0

    if (random(1) < 0.5) {
      this.phaseStep = TAU / 128
    } else {
      this.phaseStep = -TAU / 128
    }

    if (random(1) < 0.5) {
      this.theta = HALF_PI
    } else {
      this.theta = 0
    }

    if (random(1) < 0.5) {
      this.c = color(64, 255, 255)
    } else {
      this.c = color(248, 64, 248)
    }


  }


  update() {
    this.startPhase += this.phaseStep
    this.phase = this.startPhase
  }

  display() {
    push()
    translate(this.xPos, this.yPos)

    noFill()
    stroke(this.c)
    rotate(this.theta)

    beginShape()
    for (let x = -this.waveWidth / 2; x < this.waveWidth / 2; x++) {
      const y = sin(x * this.period + this.phase) * this.amplitude
      vertex(x, y)
    }
    endShape()

    pop()
  }
}

export default Grid
