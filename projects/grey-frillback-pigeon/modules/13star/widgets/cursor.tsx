import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {fabric} from "fabric";

const config = {
  color: "#94ffff",
  out2CircleRadius: 40,
  out1CircleRadius: 30,
  inner1CircleRadius: 20,
  inner2CircleRadius: 15,
}


export const Cursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const updateCursor = () => {
      // document.body.style.cursor = `url(${canvas.toDataURL()}), auto`
    }

    let a1 = 360
    let a2 = -360

    const animeGroup1 = () => {
      outer1.animate('angle', 200, {
        onChange: () => {
          canvas.renderAll()
          updateCursor()
        },
        onComplete: () => {
          // a1 += 360
          // animeGroup1()
        },
        duration: 36000
      })
      outer2.animate('angle', a2, {
        onChange: () => {
          canvas.renderAll()
          updateCursor()
        },
        onComplete: () => {
          a2 -= 360
          animeGroup2()
        },
        duration: 36000
      })
    }

    const animeGroup2 = () => {
      inner1.animate('angle', 240, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 2400
      })
      inner2.animate('angle', 240, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 2400
      })
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 100,
      height: 100,
      selection: false
    });

    const outer2 = new fabric.Circle({
      radius: config.out2CircleRadius,
      fill: "transparent",
      stroke: config.color,
      strokeWidth: 2,
      opacity: 1,
      originX: 'center',
      originY: 'center',
      selectable: false,
      centeredRotation: true,
    })

    const outer1 = new fabric.Circle({
      radius: config.out1CircleRadius,
      fill: "transparent",
      stroke: config.color,
      strokeWidth: 3,
      opacity: 1,
      selectable: false,
      originX: 'center',
      originY: 'center',
      centeredRotation: true,
    })

    const inner1 = new fabric.Circle({
      radius: config.inner1CircleRadius,
      fill: "transparent",
      stroke: config.color,
      strokeWidth: 3,
      opacity: 1,
      selectable: false,
      originX: 'center',
      originY: 'center',
      centeredRotation: true,
    })

    const inner2 = new fabric.Circle({
      radius: config.inner2CircleRadius,
      fill: "transparent",
      stroke: config.color,
      strokeWidth: 3,
      opacity: 1,
      originX: 'center',
      originY: 'center',
      selectable: false,
      centeredRotation: true,
    })
    const group = new fabric.Group(
      [
        // outer2,
        outer1,
        // inner2,
        // inner1,
      ], {
        selectable: false
      }
    )
    canvas.add(group)
    canvas.centerObject(group)
    canvas.renderAll()

    // animeGroup1()
    // animeGroup2()


    outer1.animate('angle', 20, {
      onChange: () => {
        canvas.renderAll()
        updateCursor()
      },
      onComplete: () => {
        // a1 += 360
        // animeGroup1()
      },
      duration: 36000
    })

  }, [])

  if (typeof window === "undefined") {
    return <canvas/>
  }

  return createPortal(
    <canvas ref={canvasRef}/>,
    document.body
  )
}
