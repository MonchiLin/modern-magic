import p5 from "p5";
import {range} from "ramda";
import Grid from "./grid";

class GridSystem {
  gridSize: number
  grids: Grid[] = []

  constructor(row: number, col: number, public border: number) {
    // 每个格子的宽度
    this.gridSize = (width - border * 2) / col

    range(0, row)
      .forEach(rowIndex => {
        range(0, col)
          .forEach(colIndex => {
            this.grids.push(new Grid(rowIndex, colIndex, this.gridSize))
          })
      })

  }

  run() {
    translate(this.border, this.border)

    this.grids.forEach(g => {
      g.update()
      g.display()
    })

  }

}

export default GridSystem
