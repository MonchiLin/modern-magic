import P5 from 'p5'
import Walker, {randomInt} from './walker'

class ToWalker extends Walker {

  step() {
    const r = Math.random()

    if (r < 0.4) {
      this.x++
    } else if (r < 0.6) {
      this.x--
    } else if (r < 0.8) {
      this.y++
    } else {
      this.y--
    }

  }

}

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
