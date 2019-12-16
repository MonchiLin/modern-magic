class Mover {
  location
  velocity
  acceleration

  constructor() {
    this.location = createVector(width / 2, 30);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  update() {
    if (mouseIsPressed) {
      const mouseWind = createVector(0.5, 0)
      this.applyForce(mouseWind)
    }

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
