import p5 from 'p5'


class Mover {
  mass
  location
  angle
  aVelocity
  aAcceleration
  velocity
  acceleration

  constructor(x, y, mass) {
    this.mass = mass;
    this.location = createVector(x, y);
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
    const angle = this.velocity.heading()
    stroke(0)
    fill(175, 200)
    rectMode(CENTER)
    push()
    translate(this.location.x, this.location.y)
    rotate(angle)
    rect(0, 0, this.mass * 16, this.mass * 16)
    pop()
  }
}

export default Mover
