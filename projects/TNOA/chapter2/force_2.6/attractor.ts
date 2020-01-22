class Attractor {
  mass: number
  location: p5.Vector

  constructor() {
    this.location = createVector(width / 2, height / 2)
    this.mass = 20
  }

  display() {
    stroke(0)
    fill(175, 200)
    ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2)
  }



}

export default Attractor
