import Mover from "./mover";
import PVector from "./pvector";

class Car extends Mover {
  public keyIsDown = false
  public key = ""

  constructor(p) {
    super(p);
    this.velocity = new PVector(0, 0)
    this.acceleration = new PVector(0, 0)
  }

  update() {
    this.checkEdges()

    if (!this.keyIsDown) {
      this.acceleration.y = 0
      this.acceleration.x = 0
      return
    }

    this.velocity.add(this.acceleration)

    // console.log(this.acceleration.x, this.acceleration.y)
    console.log(this.velocity.x, this.velocity.y)
    // console.log(this.location.x, this.location.y)

    switch (this.key) {
      case "ArrowUp":
        this.location.y += 1
        this.location.y += this.velocity.y
        break
      case "ArrowDown":
        this.location.y -= 1
        this.location.y -= this.velocity.y
        break
      case "ArrowLeft":
        this.location.x -= 1
        this.location.x -= this.velocity.x
        break
      case "ArrowRight":
        this.location.x += 1
        this.location.x += this.velocity.x
        break
    }

  }

}

export default Car
