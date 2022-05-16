import React, {useEffect, useRef} from "react";
import style from "./menu-indicator.module.scss"


const MenuIndicator = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const triangleRef = useRef<HTMLDivElement>(null)

  const onMouseEnter = () => {
    console.log("onMouseEnter")
    clearCanvas()
    draw()
  }

  const getRootPosition = () => {
    const clientRect = rootRef.current!.getBoundingClientRect();
    return clientRect;
  }

  const assignCanvasPosition = (rect: DOMRect) => {
    const canvas = canvasRef.current!
    canvas.width = rect.width
    canvas.height = rect.height
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    canvas.style.left = 0 + "px"
    canvas.style.top = 0 + "px"
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current!
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height)
  }

  const draw = () => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let type = 0
    let prev = {
      x: 0,
      y: 0
    }

    const d = () => {
      ctx.beginPath(); // 开始路径绘制
      if (type === 0) {
        ctx.moveTo(prev.x, 0); // 设置路径起点，坐标为(20,20)
        prev.x += 1
        ctx.lineTo(prev.x, 0); // 绘制一条到(200,20)的直线

        if (prev.x >= canvas.width) {
          type = 1
          prev.x = canvas.width
          prev.y = 0
          d()
        }
      } else if (type === 1) {
        const triangle = triangleRef.current

        ctx.moveTo(prev.x, prev.y); // 设置路径起点，坐标为(20,20)
        prev.y += 1
        ctx.lineTo(prev.x, prev.y);

        if (prev.y >= canvas.height) {
          type = 2
          prev.x = canvas.width
          prev.y = canvas.height
          d()
        }
      } else if (type === 2) {
        ctx.moveTo(prev.x, prev.y); // 设置路径起点，坐标为(20,20)
        prev.x -= 1
        ctx.lineTo(prev.x, prev.y); // 绘制一条到(200,20)的直线

        if (prev.x <= 0) {
          type = 3
          prev.x = 0
          prev.y = canvas.height
          d()
        }
      } else if (type === 3) {
        ctx.moveTo(prev.x, prev.y); // 设置路径起点，坐标为(20,20)
        prev.y -= 1
        ctx.lineTo(prev.x, prev.y); // 绘制一条到(200,20)的直线

        if (prev.y <= 0) {
          return
        }
      }

      ctx.lineWidth = 2.0; // 设置线宽
      ctx.strokeStyle = "#CC0000"; // 设置线的颜色
      ctx.stroke(); // 进行线的着色，这时整条线才变得可见

      setTimeout(() => {
        d()
      }, 8)
    }

    d()

  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      assignCanvasPosition(getRootPosition())
    }
  }, [])

  return <div
    ref={rootRef}
    onMouseEnter={onMouseEnter}
    className={"absolute cursor-pointer overflow-hidden top-[20px] right-[20px] rounded-tl-[2px] rounded-bl-[2px] flex flex-row"}>
    <div className={"bg-[#68686730] px-[8px] py-[0px]"}>
      <span className={"text-[#d6b627]"}>M</span>
      <span className={'text-[#d5d3de]'}>enu</span>
    </div>
    <div className={"px-[10px] bg-[#9ba87f59] " + style.takeTurns}><span>+</span></div>

    <div ref={triangleRef} className={"rounded-tr-[5px] rounded-br-[2px] overflow-hidden"}>
      <div
        style={{
          width: "0",
          height: "0",
          borderWidth: "0px 0 24px 24px",
          borderStyle: "solid",
          borderColor: "transparent transparent transparent #b1a265",
        }}
      />
    </div>

    <canvas ref={canvasRef} className={"z-10 absolute bg-transparent"}/>
  </div>
}

export default MenuIndicator
