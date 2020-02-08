import "p5"
import * as box2d from '@flyover/box2d'
import {createWorld} from "../../box2d-helper"
import Box from "./box"

// @ts-ignore
window.world = createWorld()

const world = window.world
const boxes = [];

function setup() {
  createCanvas(640, 640)
}

function draw() {
  background(51)
  const timeStep = 1.0 / 30
  world.Step(timeStep, 10, 10)

  // Boxes fall from the top every so often
  if (mouseIsPressed) {
    let b = new Box(mouseX, mouseY);
    boxes.push(b);
  }
  // Display all the boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw

