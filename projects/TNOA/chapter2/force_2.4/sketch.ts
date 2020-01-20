import "p5"
import Mover from './mover'
import {range} from "ramda";

let movers: Mover[] = []

/**
 * 滑动摩擦力公式： Friction = μ * N
 * μ(缪斯): 摩擦力系数
 * N: 正压力
 *
 *
 *
 * 在编程中公式： Friction = -1 * μ * N * v
 * μ(缪斯): 摩擦力系数
 * N：正压力
 * v: 速度（向量）
 * -1： 用于将速度取反
 *
 */


// 正向力
const normal = 1
// 摩擦系数
const c = 1

function setup() {
  createCanvas(500, 500)

  movers = range(0, 20)
    .map(i => {
      return new Mover(random(0.1, 2), random(0, width), random(0, height))
    })
}

function draw() {
  clear()
  movers.forEach(mover => {
    const m = mover.mass
    const gravity = createVector(0, 0.1 * m)

    //
    const frictionMag = c * normal

    // 1. 复制速度向量 Friction = v
    // 2. 单位化 （得到速度向量的单位向量）
    // 3. 乘 -1 （将其方向取反，因为摩擦力与速度方向相关） Friction = -1 * v
    // 4. 乘 摩擦系数 Friction = -1 * (μ * N) * v
    const friction = mover.velocity
      .copy()
      .normalize()
      .mult(-1)
      .mult(frictionMag)

    mover.applyForce(friction)
    mover.applyForce(gravity)
    mover.update()
    mover.display()
    mover.checkEdge()
  })

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
