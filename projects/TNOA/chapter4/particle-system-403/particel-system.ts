import p5 from 'p5'
import Particle from "./particel";
import {range} from "ramda";

export default class ParticleSystem {
  particles: Particle[]
  origin: p5.Vector

  constructor(origin: p5.Vector) {
    this.particles = []
    this.origin = origin.copy()
  }

  addParticle() {
    this.particles.push(new Particle(this.origin))
  }

  run() {
    this.addParticle()
    this.particles = this.particles.filter(p => !p.isDead)
    this.particles.forEach(p => p.run())
  }
}
