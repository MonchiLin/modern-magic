import "p5"
import Oscillator from "./oscillator";

let oscillator: Oscillator

function setup() {
  createCanvas(640, 360);
  oscillator = new Oscillator()
}

function draw() {
  oscillator.oscillator()
  oscillator.display()
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
