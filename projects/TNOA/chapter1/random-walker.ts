import P5 from 'p5'
import Walker from './walker'


const sketch = (p: P5) => {

  let walker: Walker

  let x = 0
  let speed = 0

  p.setup = () => {
    p5.createCanvas(640, 880)
    walker = new Walker(p)
  }

  p.draw = () => {
    walker.step()
    walker.display()
  }

  p.preload = () => {

  }

}

const p5 = new P5(sketch);
