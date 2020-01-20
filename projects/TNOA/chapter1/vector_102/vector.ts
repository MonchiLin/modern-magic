class Vector {


  constructor(public x, public y) {

  }

  add(vector: Vector) {
    this.x += vector.x
    this.y += vector.y
  }
}

export default Vector
