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
    this.aAcceleration = 0;
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
    // 更新角速度
    this.aVelocity += this.aAcceleration
    // 更新角度
    this.angle += this.aVelocity;
    // 重置速度
    this.acceleration.mult(0);
  }

  display() {
    // 设置边框颜色
    stroke(0)
    // 设置形状的颜色
    fill(175,200)
    //
    rectMode(CENTER)

  }
}

export default Mover
