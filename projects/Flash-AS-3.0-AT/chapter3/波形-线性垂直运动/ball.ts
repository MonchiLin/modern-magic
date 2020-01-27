class Ball {
  angle = 0
  x = 0
  y = 0
  range = 80
  xSpeed = 1
  ySpeed = 0.5

  constructor(public radius = 40, public color = 0xff0000) {
  }

  update() {
    this.x += this.xSpeed
    this.y = sin(this.angle) * this.range

    this.angle += this.ySpeed
  }

  display() {
    push()
    translate(width / 2, height / 2)
    fill(this.color)
    circle(
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius
    )
    pop()
  }
}

export default Ball
