let inSlowDownArea = true
let inAccelerateArea = true

class Mover {
  location: p5.Vector
  velocity: p5.Vector
  acceleration: p5.Vector
  mass: number

  constructor(m, x, y) {
    this.mass = m
    this.location = createVector(x, y);
    this.velocity = createVector(1, 1);
    this.acceleration = createVector(0.2, 0.2);
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0)
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    ellipse(this.location.x, this.location.y, this.mass, this.mass);
  }

  calcFriction(normal, c) {
    const frictionMag = c * normal

    // 1. 复制速度向量 Friction = v
    // 2. 单位化 （得到速度向量的单位向量）
    // 3. 乘 -1 （将其方向取反，因为摩擦力与速度方向相关） Friction = -1 * v
    // 4. 乘 摩擦系数 Friction = -1 * (μ * N) * v
    return this.velocity
      .copy()
      .normalize()
      .mult(-1)
      .mult(frictionMag)
  }

  checkSlowDownArea() {
    push()
    fill(100)
    rect(180, 180, 180, 180)

    if (this.location.x > 90 - this.mass / 2
      && this.location.x < 180 + this.mass / 2
      && this.location.y > 90 - this.mass / 2
      && this.location.y < 180 + this.mass / 2
    ) {
      console.log("在减速区域")
      if (!inSlowDownArea) {
        console.log("施加摩擦力")
        this.applyForce(this.calcFriction(0.5, 0.5))
      }
      inSlowDownArea = true
    } else {
      inSlowDownArea = false
    }
    pop()
  }

  checkEdge() {
    if (this.location.x > width) {
      this.location.x = width
      this.velocity.x *= -1
    } else if (this.location.x < 0) {
      this.location.x = 0
      this.velocity.x *= -1
    }

    if (this.location.y > height) {
      this.location.y = height
      this.velocity.y *= -1
    } else if (this.location.x < 0) {
      this.location.y = 0
      this.velocity.y *= -1
    }


  }

}

export default Mover
