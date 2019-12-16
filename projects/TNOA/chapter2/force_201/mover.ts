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
    this.acceleration = force
  }

  update() {
    // 速度 + 加速度
    this.velocity.add(this.acceleration);
    // 位置 + 速度
    this.location.add(this.velocity);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    ellipse(this.location.x, this.location.y, 48, 48);
  }


}

export default Mover
