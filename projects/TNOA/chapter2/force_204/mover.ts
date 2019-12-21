class Mover {
  location
  velocity
  acceleration
  mass = 10

  constructor() {
    this.location = createVector(width / 2, height / 2);
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
    ellipse(this.location.x, this.location.y, 48, 48);
  }


}

export default Mover
