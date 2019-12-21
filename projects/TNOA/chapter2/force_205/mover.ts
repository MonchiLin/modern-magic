class Mover {
  location
  velocity
  acceleration
  mass = 1

  constructor() {
    this.location = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    const f = force.copy()
    f.div(this.mass)
    this.acceleration.add(f)
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
    ellipse(this.location.x, this.location.y, 5, 5);
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
      console.log("此时的 y =>", this.location.y, "velocity", this.velocity.y)
    } else if (this.location.y < 0) {
      this.location.y = 0
      this.velocity.y *= -1
    }


  }


}

export default Mover
