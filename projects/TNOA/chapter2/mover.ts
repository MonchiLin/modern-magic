import PVector from "./pvector";

class Mover {
  location: PVector
  velocity: PVector
  acceleration: PVector
  topspeed = 10

  constructor(private p) {
    this.location = new PVector(p.width * 0.5, p.height * 0.5)
    this.velocity = new PVector(0, 0)
    this.acceleration = new PVector(-0.001, 0.01)
  }

  checkEdges() {
    if (this.location.x > this.p.width) {
      this.location.x = 0
    } else if (this.location.x < 0) {
      this.location.x = this.p.width
    }

    if (this.location.y > this.p.height) {
      this.location.y = 0
    } else if (this.location.y < 0) {
      this.location.y = this.p.height
    }

  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limt(this.topspeed)

    this.location.add(this.velocity)
  }

  display() {
    this.p.stroke(0)
    this.p.fill(175)
    this.p.ellipse(this.location.x, this.location.y, 16, 16)
  }

}

export default Mover

