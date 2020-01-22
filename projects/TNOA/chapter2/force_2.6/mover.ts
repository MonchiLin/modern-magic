class Mover {
  location: p5.Vector
  velocity: p5.Vector
  acceleration: p5.Vector
  mass: number

  constructor(m) {
    this.mass = m
    this.location = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0.01, 0.01);
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
    ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16);
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
