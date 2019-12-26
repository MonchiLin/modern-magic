import "p5"

let vector: p5.Vector

/**
 *                   ↙
 *                  ↙↓
 *                 ↙ ↓
 *                ↙  ↓
 *         R     ↙   ↓ X
 *              ↙    ↓
 *             ↙     ↓
 *            ↙      ↓
 *           ↙       ↓
 *          ↙        ↓
 *         ↙→→→→→→→→→↓
 *   Tan(Θ)    Y
 *
 *
 * 极坐标转换笛卡尔坐标系
 * 极坐标：（r，Θ）r = 向量的长度，Θ = 向量的方向（角度）
 * 笛卡尔坐标系：（x,y）向量的 x 和向量的 y
 *
 *
 * x: 临边， y: 对边  r: 斜边
 * 临边 = sqrt(x * 2 + y * 2)
 *
 * Sin(Θ) => ${对边 / 斜边}
 * Cos(Θ) => ${邻边 / 斜边}
 *
 * sin(Θ) = y / r  -> y = r * sin(Θ)
 * cos(Θ) = x / r  -> x = r * cos(Θ)
 *
 *
 */
function Cartesian2Polar(x, y) {
  const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  const theta = Math.atan2(y, x)

  return {
    r,
    theta
  }
}

function Polar2Cartesian(r, theta) {
  const x = r * cos(theta)
  const y = r * sin(theta)

  return {
    x,
    y
  }
}


function setup() {
  vector = createVector(20, 20)
  createCanvas(640, 360);
}

function draw() {

  const polar = Cartesian2Polar(12, 5)
  const cartesian = Polar2Cartesian(polar.r, polar.theta)
  // console.log(polar.r, polar.theta)
  // console.log(cartesian.x, cartesian.y)
  // console.log(Cartesian2Polar(cartesian.x, cartesian.y))
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
