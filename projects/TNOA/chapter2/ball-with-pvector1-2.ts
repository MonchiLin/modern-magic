import P5 from 'p5'
import PVector from "./pvector";


const sketch = (p: P5) => {

  let location: PVector
  let velocity: PVector

  p.setup = () => {
    p.createCanvas(500, 500)
    p.smooth()
    location = new PVector(100, 100)
    velocity = new PVector(2.5, 5)
  }

  p.draw = () => {
    p.background(255)

    location.add(velocity)
    if ((location.x > p.width) || (location.x < 0)) {
      velocity.x *= -1
    }

    if ((location.y > p.width) || (location.y < 0)) {
      velocity.y *= -1
    }

    // 画笔颜色
    p.stroke(0)
    // 填充颜色
    p.fill(175)
    p.ellipse(location.x, location.y, 16, 16)


    p.line(p.width * 0.5, p.height * 0.5, p.mouseX, p.mouseY)
  }

  p.preload = () => {

  }

}

const p5 = new P5(sketch);
