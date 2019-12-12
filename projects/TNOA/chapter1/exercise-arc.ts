import P5 from 'p5'


const sketch = (p: P5) => {
  let x = 0, y = 0;
  let centerX, centerY

  p.setup = () => {
    p.createCanvas(500, 500)
    centerX = p.width * 0.5
    centerY = p.height * 0.5
  }

  p.draw = () => {
    // p.arc(20)
    p.point(x, y)
    p.arc(125, 125, 176.78, 176.78, 0,120,)
  }

  p.preload = () => {

  }

}

const p5 = new P5(sketch);
