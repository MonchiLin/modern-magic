class Mover {
  location
  velocity
  acceleration
  force
  pass = true

  constructor() {
    this.location = createVector(width * 0.5, height);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.force = createVector(0, -0.01);

  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  update() {
    this.applyForce(this.force)

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0)
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    ellipse(this.location.x, this.location.y, 48, 48);
  }

  checkEdge() {
    if (this.location.y <= 0 && this.pass) {
      this.force = createVector(0, this.velocity.y * -1)
      this.pass = false
    } else if (this.location.y > height) {
      this.force = createVector(0, this.velocity.y * -1)
      this.pass = true
    }
  }

}

export default Mover
