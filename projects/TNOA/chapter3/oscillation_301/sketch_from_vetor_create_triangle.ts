import "p5"

let vector: p5.Vector

function setup() {
  vector = createVector(20, 20)
  createCanvas(640, 360);
}

function draw() {
  const {
    x: 邻边,
    y: 对边
  } = vector

  const 斜边 = Math.sqrt(Math.pow(邻边, 2) + Math.pow(对边, 2))

  text(`斜边 《${斜边}》，临边 《${对边}》，临边 《${对边}》`, 0, 10)

  // sin(0) = y / r
  text(`sin(Θ) => ${对边 / 斜边}`, 0, 40)

  text(`cos(Θ) => ${邻边 / 斜边}`, 0, 60)

  const tan = 对边 / 邻边

  // x / y 可以得到 tan(夹角)
  text(`tan(Θ) => ${tan}`, 0, 80)

  // 如何 tan(a) = b
  // 那么 arctan(b) = a
  // 如何 tan(夹角) = y / x
  // 那么 arctan(y / x) = 夹角

  text(`夹角 => ${atan(对边 / 邻边)}`, 0, 100)


}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
