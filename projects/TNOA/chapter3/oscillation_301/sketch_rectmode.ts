import "p5"

let angle = 0

function setup() {
  createCanvas(640, 360);
}

function draw() {
  // 默认:  corner rect() 前两个参数将被解读成形状的左上角的位置，而第三和第四个参数为宽度和高度。
  rectMode(CORNER)
  rect(200, 200, 50, 50)


  // 将 rect 前两个参数解读为中心点
  // 这句话的意思就是说当你 想要设置 x y 为 50，50，w,h为 50，50 的时候
  // 你不需要手动修改 x 和 y 为 25，25，rect 会自动修改 x 和 y 为 25，25
  rectMode(CENTER)
  rect(width * .5, height * .5, 50, 50)


  // 下方为 P5.js 根据不同 mode 调整形状渲染属性的方法

  // function modeAdjust(a, b, c, d, mode) {
  //   if (mode === constants.CORNER) {
  //     return { x: a, y: b, w: c, h: d };
  //   } else if (mode === constants.CORNERS) {
  //     return { x: a, y: b, w: c - a, h: d - b };
  //   } else if (mode === constants.RADIUS) {
  //     return { x: a - c, y: b - d, w: 2 * c, h: 2 * d };

  // 根据上方推测，我们来看看源码，x 和 y 果然会自动根据宽高居中
  //   } else if (mode === constants.CENTER) {
  //     return { x: a - c * 0.5, y: b - d * 0.5, w: c, h: d };
  //   }
  // }

}

// @ts-ignore
window.setup = setup

// @ts-ignore
window.draw = draw
