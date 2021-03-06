import P5 from 'p5'
import PVector from "./pvector";


const sketch = (p: P5) => {

  let mouse: PVector
  let center: PVector

  p.setup = () => {
    p.createCanvas(500, 500)
    p.smooth()
  }

  p.draw = () => {
    p.background(255)

    mouse = new PVector(p.mouseX, p.mouseY)
    center = new PVector(p.width * 0.5, p.width * 0.5)

    const m = mouse.mag()

    p.fill(0)
    p.rect(0, 0, m, 10)
  }

  p.preload = () => {

  }

}

const p5 = new P5(sketch);
