import p5 from "p5";

class Mover {
  location: p5.Vector
  velocity: p5.Vector
  acceleration: p5.Vector
  topspeed = 10

  constructor() {
    this.location = createVector(width * 0.5, height * 0.5)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(-0.01, 0.1)
  }

  checkEdges() {
    if (this.location.x > width) {
      this.location.x = 0
    } else if (this.location.x < 0) {
      this.location.x = width
    }

    if (this.location.y > height) {
      this.location.y = 0
    } else if (this.location.y < 0) {
      this.location.y = height
    }

  }

  update() {
    const mouse = createVector(mouseX, mouseY)
    const dir = mouse.copy()
      .sub(this.location)
    const anything = 1
    dir.normalize()
    dir.mult(anything)
    this.acceleration = dir

    this.velocity.add(this.acceleration)
    this.velocity.limit(this.topspeed)
    this.location.add(this.velocity)
  }

  display() {
    clear()
    stroke(0)
    fill(175)
    ellipse(this.location.x, this.location.y, 16, 16)
  }

}

export default Mover

