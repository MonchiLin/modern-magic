import P5 from 'p5'


const sketch = (p: P5) => {

  let x = 100
  let y = 100
  let xSpeed = 1
  let ySpeed = 3.3

  p.setup = () => {
    p.createCanvas(200, 200)
    p.smooth()
    p.background(255)
  }

  p.draw = () => {
    p.background(255)
    x += xSpeed
    y += ySpeed

    // 画笔颜色
    p.stroke(0)
    // 填充颜色
    p.fill(175)
    p.ellipse(x, y, 16, 16)

    if ((x > p.width) || (x < 0)) {
      xSpeed *= -1
    }

    if ((y > p.width) || (y < 0)) {
      ySpeed *= -1
    }

  }

  p.preload = () => {

  }

}

const p5 = new P5(sketch);
