import P5 from 'p5'
import PVector from "./pvector";
import carAsset from './car.png'
import Mover from "./mover";
import Car from "./car";

const sketch = (p: P5) => {

  let carImage

  let car: Car

  p.setup = () => {
    p.createCanvas(500, 500)
    car = new Car(p)

  }

  p.draw = () => {
    p.clear()
    car.update()
    p.image(carImage, car.location.x, car.location.y, 50, 80)
  }

  p.preload = () => {
    carImage = p.loadImage(carAsset)
  }

  // @ts-ignore
  p.keyPressed = event => {
    car.handleKeyPressed(event)
  }

  // @ts-ignore
  p.keyReleased = () => {
    car.handleKeyReleased()
  }

}

const p5 = new P5(sketch);

