import P5 from 'p5'
import PVector from "./pvector";
import Mover from "./mover";


const sketch = (p: P5) => {

  let mover: Mover

  p.setup = () => {
    p.createCanvas(500, 500)
    p.smooth()
    mover = new Mover(p)
  }

  p.draw = () => {
    p.background(255)
    mover.update()
    mover.checkEdges()
    mover.display()
  }

  p.preload = () => {

  }

}

const p5 = new P5(sketch);
