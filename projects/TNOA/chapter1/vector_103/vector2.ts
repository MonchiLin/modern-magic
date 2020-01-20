class Vector2 {


  constructor(public x, public y) {

  }

  add(vector: Vector2) {
    this.x += vector.x
    this.y += vector.y
  }

  sub(vector: Vector2) {
    this.x -= vector.x
    this.y -= vector.y
  }

  mult(scalar: number) {
    this.x *= scalar
    this.y *= scalar
  }

  div(scalar: number) {
    if (scalar !== 0) {
      this.x /= scalar
      this.y /= scalar
    }
  }

  normalize() {
    const length = this.length()
    this.x /= length
    this.y /= length

    // this.div(length)
  }

  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

}

export default Vector2
