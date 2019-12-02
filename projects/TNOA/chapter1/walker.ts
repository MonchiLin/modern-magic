import P5 from "p5";

function randomInt(low, high) {
  return Math.round(low + Math.random() * high)
}

class Walker {

  x: number
  y: number

  constructor(public p: P5) {
    this.x = p.width / 2
    this.y = p.height / 2

    // 设置画笔颜色
    p.stroke(0)
  }


  display() {
    this.p.point(this.x, this.y)
  }

  step() {
    const stepX = randomInt(0, 3) - 1
    const stepY = randomInt(0, 3) - 1

    this.x += stepX
    this.y += stepY
  }
}

export default Walker

export {
  randomInt
}
