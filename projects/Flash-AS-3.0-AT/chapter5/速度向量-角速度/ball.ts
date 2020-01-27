class Ball {
  x = 0
  y = 0
  vx = 5
  vy = 5
  angle = 45
  speed = 3

  constructor(public radius = 40, public color = 0xff0000) {

  }

  update() {
    this.vx = cos(this.angle) * this.speed
    this.vy = sin(this.angle) * this.speed
    this.x += this.vx
    this.y += this.vy
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
