import p5 from "p5";

class Pendulum {
  location: p5.Vector // 摆轴位置
  origin: p5.Vector // 枢轴点位置
  r: number // 摆轴长度
  angle: number // 摆轴角度
  aVelocity: number // 角速度
  aAcceleration: number // 角加速度
  damping: number // 减震幅度

  constructor(origin: p5.Vector, r: number) {
    this.origin = origin
    this.location = createVector()
    this.r = r
    this.angle = PI / 4
    this.aVelocity = 0.0
    this.aAcceleration = 0.0
    this.damping = 0.995
  }

  go() {
    this.update()
    this.display()
  }

  update() {
    const gravity = 0.4
    this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle)
    this.aVelocity += this.aAcceleration
    this.angle += this.aVelocity

    this.aVelocity *= this.damping
  }

  display() {
    this.location.set(this.r * sin(this.angle), this.r * cos(this.angle))
    this.location.add(this.origin)

    stroke(0)
    line(this.origin.x, this.origin.y, this.location.x, this.location.y)
    fill(175)
    ellipse(this.location.x, this.location.y, 16, 16)
  }

}

export default Pendulum
