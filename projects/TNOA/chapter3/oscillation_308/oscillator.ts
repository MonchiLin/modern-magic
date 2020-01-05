export default class Oscillator {
  angle: p5.Vector
  velocity: p5.Vector
  amplitude: p5.Vector

  constructor() {
    this.angle = createVector()
    this.velocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05))
    this.amplitude = createVector(random(width / 2), height / 2)
  }

  oscillator() {
    this.angle.add(this.velocity)
  }

  display() {
    const y = sin(this.angle.x) * this.amplitude.x
    const x = sin(this.angle.y) * this.amplitude.y

    push()
    translate(width / 2, height / 2)
    stroke(0)
    fill(177)
    line(0, 0, x, y)
    ellipse(x, y, 16, 16)
    pop()

  }

}
