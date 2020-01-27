import Ship from "./ship";

class ShipSim {

  ship = new Ship()
  // 旋转速度向量 - 飞船旋转的速度
  vr = 0
  // 推力
  thrust = 0

  vx = 0
  vy = 0

  update() {
    push()
    translate(width / 2, height / 2)
    this.ship.rotate(this.vr)
    const angle = degrees(this.ship.rotation)
    const ax = cos(angle) * this.thrust
    const ay = sin(angle) * this.thrust
    this.vx += ax
    this.vy += ay
    this.ship.x += this.vx
    this.ship.y += this.vy
    this.ship.draw(false)
    pop()
  }

  display() {
  }

  onKeyDown(e) {
    switch (e.code) {
      // 左旋转
      case "ArrowLeft":
        this.vr = -5
        break
      // 右旋转
      case "ArrowRight":
        this.vr = 5
        break
      case "ArrowDown":

        break
      case "ArrowUp":
        // 按下前进才会 “点火”（推力）
        this.thrust = 0.2
        // 然后绘制火焰
        this.ship.draw(true)
        break
    }

  }

  onKeyUp(e) {
    // 旋转为 0
    this.vr = 0
    // 推力为 0
    this.thrust = 0
    // 关闭火焰
    this.ship.draw(false)
  }

}

export default ShipSim
