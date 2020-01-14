class Mover {
  location: p5.Vector
  velocity: p5.Vector
  acceleration: p5.Vector
  force: p5.Vector
  pass = true

  constructor() {
    this.location = createVector(width * 0.5, height);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.force = createVector(0, -0.01)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  update() {
    const wind = createVector(
      map(noise(frameCount), 0, 1, 0.01, -0.01)
      , 0)

    this.applyForce(this.force)
    this.applyForce(wind)

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
    if (this.location.y >= height + 50 || this.location.y <= 0) {
      this.velocity = createVector(0, this.velocity.y * -1.2)
      this.location = createVector(this.location.x, 0)
    }
  }

}

export default Mover
