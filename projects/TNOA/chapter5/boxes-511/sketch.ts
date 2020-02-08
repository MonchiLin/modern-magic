import "p5"
import {GravityBehavior, Rect, Vec2D, VerletPhysics2D} from "../toxichelper"
import Chain from "./chain";

const len = 10

let physics
let chain

function setup() {
  createCanvas(640, 360);

  // 创建物理世界
  physics = new VerletPhysics2D();
  // 增加重力
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  physics.setWorldBounds(new Rect(0, 0, width, height));

  chain = new Chain(180, 20, 16, 0.2, physics)
}

function draw() {

  // Update the physics world
  physics.update();

  background(51);

  // Update physics
  physics.update();
  // Update chain's tail according to mouse position
  chain.updateTail(mouseX, mouseY);
  // Display chain
  chain.display();
}

function mousePressed() {
  // Check to see if we're grabbing the chain
  chain.contains(mouseX, mouseY);
}

function mouseReleased() {
  // Release the chain
  chain.release();
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw

// @ts-ignore
window.mousePressed = mousePressed

// @ts-ignore
window.mouseReleased = mouseReleased

