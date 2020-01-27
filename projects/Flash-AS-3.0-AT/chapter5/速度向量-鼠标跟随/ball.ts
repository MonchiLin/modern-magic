class Ball {
  x = 0
  y = 0
  angle = 45
  speed = 3
  // 球至鼠标圆的半径
  mouseRadius = 35

  constructor(public radius = 40, public color = 0xff0000) {

  }

  update() {
    const dx = mouseX - width / 2 - this.x
    const dy = mouseY - height / 2 - this.y
    const length = sqrt(pow(dx, 2) + pow(dy, 2))
    // 弧度制
    let angle = atan2(dy, dx)

    if (length > this.mouseRadius) {
      console.log("靠近")
      const vx = cos(angle) * this.speed
      const vy = sin(angle) * this.speed
      this.x += vx
      this.y += vy
    } else {
      console.log("旋转")
      angle += 0.01
      const vx = cos(angle) * this.mouseRadius
      const vy = sin(angle) * this.mouseRadius
      this.x += vx
      this.y += vy
    }


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
