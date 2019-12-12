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
    car.keyIsDown = true
    car.key = event.key

    switch (event.key) {
      case "ArrowUp":
        car.acceleration.y = 0.1
        break
      case "ArrowDown":
        car.acceleration.y = -0.1
        break
      case "ArrowLeft":
        car.acceleration.x = 0.1
        break
      case "ArrowRight":
        car.acceleration.x = -0.1
        break
    }
  }

  // @ts-ignore
  p.keyReleased = () => {
    car.keyIsDown = false
    car.acceleration.y = 0
    car.acceleration.x = 0
    car.velocity.y = 0
    car.velocity.x = 0
  }

}

const p5 = new P5(sketch);

