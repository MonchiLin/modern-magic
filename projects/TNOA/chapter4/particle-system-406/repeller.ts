import Particle from "./particel";
import p5 from 'p5'

export default class Repeller {
  r = 10
  power = 150

  constructor(public location: p5.Vector) {

  }

  display() {
    push()
    stroke(255)
    fill(255)
    ellipseMode(CENTER)
    ellipse(this.location.x, this.location.y, this.r * 2, this.r * 2)
    pop()
  }

  repel(p: Particle) {
    // 获取力的方向
    const dir = p5.Vector.sub(this.location, p.location)

    // 获取距离并且将其限制在 5 - 100 之间
    const d = constrain(dir.mag(), 5, 100)

    // 获取单位方向
    dir.normalize()

    // 力 = 排斥力与距离的反比
    const force = -1 * this.power / (d * d)

    dir.mult(force)
    return dir
  }
}
