import "p5"
import Mover from "./mover";
import {range} from "ramda";

let movers: Mover[] = []

function setup() {
  createCanvas(640, 360);
  smooth()

  movers = range(0, 20)
    .map(_ => new Mover())

}

function draw() {
  clear()
  movers.forEach(mover => {
    mover.update()
    mover.checkEdges()
    mover.display()
  })

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
