import {useEffect, useRef} from "react";
import {CanvasExtend} from "../../../../shared/canvas";

/**
 *
 * 假设我去计算 (1,4), (4,1) 的斜率, 得到的结果
 * 列率为 -1 : 1-4 / 4-1 = -3 / 3 = -1
 * y = 斜率(k)*x
 * x = 5, k = -1, y = -5
 *
 */

export default function () {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = async () => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const width = canvas.width;
    const height = canvas.height;

    await CanvasExtend.drawAxis(canvasRef.current!)
    await CanvasExtend
      .animeDrawLine(
        ctx,
        {
          start: {
            x: 200,
            y: 0
          },
          end: {
            x: width,
            y: height - 200
          }
        }
      )
      .run()
  }

  useEffect(() => {
    draw()
  }, [])

  return <div className={"flex flex-1 justify-center items-center"}>
    <canvas width={500} height={500} className={"w-[500px] h-[500px] bg-white rounded-xl"} ref={canvasRef}/>
  </div>
}
