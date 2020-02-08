import Particle from "./particle";
import {Vec2D, VerletSpring2D} from '../toxichelper'

export default class Chain {
  particles = []

  // 多长
  totalLength: number
  // 多少个点
  numPoints: number

  // 最后一个球的半径
  strength: number

  // 弹簧的强度
  radius: number

  tail

  offset: p5.Vector;
  dragged: boolean;

  constructor(l, n, r, s, public physics) {
    this.totalLength = l
    this.numPoints = n
    this.radius = r
    this.strength = s

    //
    const len = this.totalLength / this.numPoints

    for (let i = 0; i < this.numPoints; i++) {
      const particle = new Particle(new Vec2D(width / 2, i * len))
      this.physics.addParticle(particle)
      this.particles.push(particle)

      if (i === 0) {
        // 固定第一个
        particle.lock()
        continue
      }

      const previous = this.particles[i - 1]
      const spring = new VerletSpring2D(particle, previous, len, this.strength)
      physics.addSpring(spring)
    }

    this.tail = this.particles[this.particles.length - 1]
    this.tail.radius = this.radius

    // Some let iables for mouse dragging
    this.offset = createVector();
    this.dragged = false;
  }

  release() {
    this.tail.unlock();
    this.dragged = false;
  }

  updateTail(x, y) {
    if (this.dragged) {
      this.tail.set(x + this.offset.x, y + this.offset.y);
    }
  }

  contains(x, y) {
    let d = dist(x, y, this.tail.x, this.tail.y);
    if (d < this.radius) {
      this.offset.x = this.tail.x - x;
      this.offset.y = this.tail.y - y;
      this.tail.lock();
      this.dragged = true;
    }
  }

  display() {
    // Draw line connecting all points
    beginShape();
    stroke(200);
    strokeWeight(2);
    noFill();
    for (let i = 0; i < this.particles.length; i++) {
      vertex(this.particles[i].x, this.particles[i].y);
    }
    endShape();
    this.tail.display();
  }
}
