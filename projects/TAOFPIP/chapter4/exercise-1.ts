import "p5"


function setup() {
  createCanvas(300, 300)
}

function draw() {
  clear()
  print(int(random(19, 78)))
}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
