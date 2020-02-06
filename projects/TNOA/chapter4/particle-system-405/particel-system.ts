import p5 from 'p5'
import Particle from "./particel";
import Confetti from "./confetti";

export default class ParticleSystem {
  particles: Particle[] = []
  confetties: Confetti[] = []
  origin: p5.Vector

  constructor(origin: p5.Vector) {
    this.origin = origin.copy()
  }

  applyForce(force: p5.Vector) {
    this.particles.forEach(p => p.applyForce(force))
    this.confetties.forEach(p => p.applyForce(force))
  }

  addParticle() {
    this.particles.push(new Particle(this.origin))
    this.confetties.push(new Confetti(this.origin))
  }

  run() {
    this.addParticle()
    this.particles = this.particles.filter(p => !p.isDead)
      .map(p => {
        p.run()
        return p
      })
    this.confetties = this.confetties.filter(p => !p.isDead)
      .map(p => {
        p.run()
        return p
      })
  }
}
