import "p5"
import Mover from './mover'
import Attractor from "./attractor";

/**
 * 引力公式
 *
 * F = G * (M1*M2) / (d*d) * r
 *
 * F: 引力
 * G: 万有引力常数
 * M1: 物体1 的质量
 * M2: 物体2 的质量
 * d:  两个物体中心点的距离
 * r: 物体1 到 物体2 的单位向量
 * （注意，我们常说的引力公式是不乘以 r 的，若乘以 r 则表示这个力拥有方向）
 *
 */


let mover: Mover
let attractor: Attractor;

function setup() {
  createCanvas(500, 500)
  mover = new Mover(10)
}

function draw() {
  clear()

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
