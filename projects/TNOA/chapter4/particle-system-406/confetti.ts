import Particle from "./particel";

export default class Confetti extends Particle {

  constructor(location: p5.Vector) {
    super(location);
  }

  display() {
    const theta = map(this.location.x, 0, width, 0, TWO_PI * 2)

    rectMode(CENTER)
    fill(175)
    stroke(0)

    push()
    translate(this.location.x, this.location.y)
    rotate(theta)
    rect(0, 0, 8, 8)
    pop()
  }

}
