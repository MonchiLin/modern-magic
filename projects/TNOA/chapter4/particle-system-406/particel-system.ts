import p5 from 'p5'
import Particle from "./particel";
import Confetti from "./confetti";
import Repeller from "./repeller";

export default class ParticleSystem {
  particles: Particle[] = []
  origin: p5.Vector

  constructor(origin: p5.Vector) {
    this.origin = origin.copy()
  }

  applyForce(force: p5.Vector) {
    this.particles.forEach(p => p.applyForce(force))
  }

  addParticle() {
    this.particles.push(new Particle(this.origin))
  }

  applyRepeller(repeller: Repeller) {
    this.particles.forEach(p => p.applyForce(repeller.repel(p)))
  }

  run() {
    this.particles = this.particles.filter(p => !p.isDead)
      .map(p => {
        p.run()
        return p
      })
  }
}
