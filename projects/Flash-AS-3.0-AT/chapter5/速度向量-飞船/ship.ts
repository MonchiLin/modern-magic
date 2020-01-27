class Ship {

  x: number = 0
  y: number = 0
  rotation = 0

  draw(showFlame: boolean) {
    translate(this.x, this.y)
    color(175)
    beginShape()
    vertex(0, 0);
    vertex(-2, -5);
    vertex(10, 0);
    vertex(-2, 5);
    vertex(0, 0);
    if (showFlame) {
      // graphics.moveTo(-7.5,-5);
      // graphics.lineTo(-15,0);
      // graphics.lineTo(-7.5,5);
    }
    endShape()
  }

  rotate(radian: number) {
    this.rotation = radian
    rotate(radian)
  }
}

export default Ship
