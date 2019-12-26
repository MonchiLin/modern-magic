import p5 from 'p5'


class Mover {
  mass
  radius
  location
  angle
  aVelocity
  aAcceleration
  velocity
  acceleration

  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = this.mass * 8;
    this.location = createVector(x, y);
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0.01;
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    // 更新速度
    this.velocity.add(this.acceleration);
    // 更新位置
    this.location.add(this.velocity);
    // 重置速度
    this.acceleration.mult(0);
  }

  display() {
    const angle = atan(this.velocity.y / this.velocity.x)

    // 设置边框颜色
    stroke(0)
    // 设置形状的颜色
    fill(175, 200)
    /**
     * 修改 rect 渲染模式，参考
     * @see ./sketch_rectmode.ts
     */
    rectMode(CENTER)

    // push 为 js canvas 的 save
    push()

    // 将原点设置为图形所在的位置
    translate(this.location.x, this.location.y)

    // 旋转角度
    rotate(angle)

    rect(0, 0, this.mass * 16, this.mass * 16)

    // pop 为 js canvas 的 restore
    pop()

  }
}

export default Mover
