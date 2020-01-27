class Ball {
  x = 0
  y = 0

  constructor(public radius = 40, public color = 0xff0000) {
  }

  update() {

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
