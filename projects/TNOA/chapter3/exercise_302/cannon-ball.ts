export default class CannonBall {
  position: p5.Vector
  velocity: p5.Vector
  acceleration: p5.Vector
  r = 8
  topSpeed = 10

  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    // 若不传值，则默认为 0
    this.acceleration = createVector()
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.topSpeed)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  display() {
    stroke(0)
    strokeWeight(2)
    push()
    translate(this.position.x, this.position.y)
    ellipse(0, 0, this.r * 2, this.r * 2)
    pop()
  }


}
