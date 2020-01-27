class Arrow {
  constructor() {

  }

  display() {
    push()

    clear()

    strokeWeight(1)
    color(0)
    fill(0xffff00)

    translate(width / 2, height / 2)

    const radians = atan2(mouseY - height / 2, mouseX - width/2)
    rotate(radians)

    beginShape()

    vertex(0, 0)
    vertex(30, 0)

    vertex(30, -10)

    vertex(50, 15)

    vertex(30, 40)
    vertex(30, 30)

    vertex(0, 30)
    vertex(0, 0)

    endShape()

    pop()
  }
}

export default Arrow
