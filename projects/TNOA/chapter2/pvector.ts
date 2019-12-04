class PVector {
  constructor(public x, public y) {
  }

  add(p: PVector) {
    this.x += p.x
    this.y += p.y
  }

  sub(p: PVector) {
    this.x -= p.x
    this.y -= p.y
  }

  mult(n) {
    this.x *= n
    this.y *= n
  }

  div(n) {
    this.x /= n
    this.y /= n
  }

  length(n) {
    this.x /= n
    this.y /= n
  }

  mag() {
    return Math.sqrt(
      Math.pow(this.x, 2) +
      Math.pow(this.y, 2)
    )
  }

  normalize() {
    const mag = this.mag()
    if(mag !== 0) {
      this.div(mag)
    }
  }

}

export default PVector
