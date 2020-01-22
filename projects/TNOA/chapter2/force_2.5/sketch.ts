import "p5"
import Mover from './mover'

let movers: Mover[] = []

/**
 * 流体阻力公式
 * Fd = 0.5 * P * (v * v) * A * Cd
 * Fd: 阻力
 * 0.5: 常量 （代码实现为 -0.5，因为阻力的方向与速度相反）
 * P（rho）: 流体密度（代码实现中假设为 1）
 * v: 物体速率，速率为速度的大小(velocity.mag())
 * A: 参考面积
 * C: 阻力系数（常量，根据阻力大小控制它的大小）
 *
 * v: 速度的单位向量 （这个是标准公式中没有的，仅服务于编程）
 *
 */

function setup() {
  createCanvas(500, 500)

}

function draw() {
  clear()

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
