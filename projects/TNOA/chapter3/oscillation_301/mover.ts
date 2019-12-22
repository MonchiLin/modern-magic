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
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.angle += this.aVelocity;
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    fill(175, 200);
    rectMode(CENTER);
    push();
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    ellipse(0, 0, this.radius * 2);
    line(0, 0, this.radius, 0);
    pop();
  }
}

export default Mover
