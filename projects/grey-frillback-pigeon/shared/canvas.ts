import {cloneDeep, merge, divide} from 'lodash'

export type Point = {
  x: number
  y: number
}

export type AnimeConfig = { duration?: number }
const defaultAnimeConfig: AnimeConfig = {
  duration: 400
}


export namespace CanvasExtend {

  export const drawAxis = async (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d")!
    const width = canvas.width;
    const height = canvas.height;

    await CanvasExtend.animeDrawLine(ctx, {start: {x: width / 2, y: 0}, end: {x: width / 2, y: height}})
      .run()

    await CanvasExtend.animeDrawLine(ctx, {start: {x: 0, y: height / 2}, end: {x: width, y: height / 2}})
      .run()
  }

  export const animeDrawLine = (
    ctx: CanvasRenderingContext2D,
    position: { start: Point, end: Point },
    config: AnimeConfig = defaultAnimeConfig
  ) => {
    const _config: Required<AnimeConfig> = merge(config, defaultAnimeConfig) as any
    const {start, end} = position
    const prev = cloneDeep(start)
    // 1. 算出总长度
    // 2. 根据持续时间算出
    // 2.1 例如持续时间为 400, 长度为 20, 那么就需要 20 个单位时间

    const delta: Point = {
      x: (_config.duration / (end.x - start.x)) * 5,
      y: (_config.duration / (end.y - start.y)) * 5,
    }

    let timer: NodeJS.Timer | null

    return {
      run: () => {
        return new Promise((resolve, reject) => {
          timer = setInterval(() => {
            ctx.moveTo(prev.x, prev.y)
            let flag = 0
            if (prev.x < end.x) {
              prev.x += delta.x
            } else {
              flag += 1
            }
            if (prev.y < end.y) {
              prev.y += delta.y
            } else {
              flag += 1
            }
            if (flag === 2) {
              clearInterval(timer!)
              resolve(null)
              return
            }

            ctx.lineTo(prev.x, prev.y)
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = "#7f7878";
            ctx.stroke();
          }, Math.max(delta.x, delta.y))
        })
      },
      clear: () => {
        clearInterval(timer!)
      }
    }
  }


}
