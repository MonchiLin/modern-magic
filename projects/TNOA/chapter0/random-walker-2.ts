import "p5"
import {range, identical} from 'ramda'

let randomCounts = []

function setup() {
  createCanvas(640, 360);
  randomCounts = range(0, 20).map(identical)
}

function draw() {
  background(220);
  const index = int(random(randomCounts.length))
  randomCounts[index]++
  stroke(0)
  fill(127)
  // 每一块的宽度
  let w = width / randomCounts.length

  randomCounts.forEach((item, i) => {
    // x -> i * w          : 索引 * 每一块的宽度
    // y -> height - item  : item 每次 draw 都有可能会 + 1，以该点作为 y
    // w -> w
    // h -> item
    rect(i * w, height - item, w - 1, item)
  })

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
