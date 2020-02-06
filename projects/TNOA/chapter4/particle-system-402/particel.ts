import p5 from 'p5'

export default class Particle {
  location: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  lifespan: number

  constructor(location: p5.Vector) {
    this.location = location.copy()
    this.acceleration = createVector(0, 0.5)
    this.velocity = createVector(random(-1, 1), random(-2, 0))
    this.lifespan = 255
  }

  get isDead() {
    return this.lifespan < 0
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.lifespan -= 2
  }

  display() {
    stroke(0, this.lifespan)
    fill(175, this.lifespan)
    ellipse(this.location.x, this.location.y, 8, 8)
  }

}
