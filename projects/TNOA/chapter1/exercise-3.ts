import P5 from 'p5'


const sketch = (p: P5) => {
  let x, y;
  p.setup = () => {
    x = p.width * 0.5
    y = p.height * 0.5

    p.createCanvas(500, 500)
  }

  p.draw = () => {
    // p.mouseX
    // p.mouseY
    const random = p.random(1)

    if (random >= 0.5) {
      if (p.mouseX > x) {
        x += 1
      } else {
        x -= 1
      }

      if (p.mouseY > y) {
        y += 1
      } else {
        y -= 1
      }

    }

    p.point(x, y)
  }

  p.preload = () => {

  }

}

const p5 = new P5(sketch);
