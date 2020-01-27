class Ball {
  angle = 0
  x = 0
  y = 0
  range = 80
  speed = 0.1

  constructor(public radius = 40, public color = 0xff0000) {
  }

  update() {
    this.y = sin(this.angle) * this.range
    this.angle += this.speed
  }

  display() {
    push()
    translate(width / 2, height / 2)
    fill(this.color)
    circle(this.x - this.radius / 2, this.y - this.radius / 2, this.radius)
    pop()
  }
}

export default Ball
