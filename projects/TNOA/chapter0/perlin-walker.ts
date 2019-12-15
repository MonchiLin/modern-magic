import P5 from 'p5'

const sketch = (p: P5) => {
  let x, y;
  // 如何 tx 和 ty 相等
  // 那么每次绘制出来的值都是
  // (100,100) (110,110) (120,120)
  // 就会造成圆会在一条固定的对角线上重复绘制
  let tx = 0, ty = 10000

  p.setup = () => {
    p5.createCanvas(500, 500)
  }

  p.draw = () => {
    x = p.map(p.noise(tx), 0, 1, 0, p.width)
    y = p.map(p.noise(ty), 0, 1, 0, p.height)

    p.ellipse(x, y, 15, 15)

    tx += 0.01
    ty += 0.01

  }

}

const p5 = new P5(sketch);
