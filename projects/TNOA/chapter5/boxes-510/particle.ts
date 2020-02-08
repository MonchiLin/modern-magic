import { VerletParticle2D } from "../toxichelper"

export default class Particle extends VerletParticle2D {
  constructor(position) {
    super(position);
  }

  // Override the display method
  display() {
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(this.x, this.y, 32, 32);
  }
}
