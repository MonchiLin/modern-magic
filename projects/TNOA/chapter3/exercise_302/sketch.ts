import "p5"
import CannonBall from "./cannon-ball";
import p5 from "p5";

let angle = 0;
let position: p5.Vector;
let shot = false;

let ball: CannonBall

function setup() {
  createCanvas(640, 360);
  angle = -PI / 4
  position = createVector(50, 300)
  ball = new CannonBall(position.x, position.y)
}

function draw() {
  background(220)

  push()
  translate(position.x, position.y)
  rotate(angle)
  rect(0, -5, 50, 10)
  pop()

  if (shot) {
    let gravity = createVector(0, 0.2)
    ball.applyForce(gravity)
    ball.update()
  }

  ball.display()

  if (ball.position.y > height) {
    ball = new CannonBall(position.x, position.y);
    shot = false;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    angle += 0.1;
  } else if (keyIsDown(LEFT_ARROW)) {
    angle -= 0.1;
  }
}

function keyPressed() {
  if (key == ' ') {
    shot = true;
    
    let force = p5.Vector.fromAngle(angle);
    console.log(force)
    force.mult(10);
    ball.applyForce(force);
  }
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw

// @ts-ignore
window.keyPressed = keyPressed
