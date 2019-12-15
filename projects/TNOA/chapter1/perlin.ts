import P5 from 'p5'

const sketch = (p: P5) => {
  let y = 0

  p.setup = () => {
    p5.createCanvas(640, 880)
  }

  p.draw = () => {
    y += 0.1

    // 原始值，原始最小值，原始最大值，新的最小值，新的最大值
    const mapY = p.map(p.noise(y), 0, 1, 0, p.width)
    p.ellipse(p.width * 0.5, mapY, 16, 16)
  }

}

const p5 = new P5(sketch);
