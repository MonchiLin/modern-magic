import BG from './assets/bg.jpg'
import {Cursor} from "./widgets/cursor";
import {useEffect, useState} from "react";
import MenuIndicator from "./widgets/menu-indicator";

/**
 * 固定为 16:9
 * 满屏宽度为 16, 单位宽度为 总宽度 / 16
 * 高度为 单位宽度 * 9
 *
 * 如果是横屏, 则相反
 */
const useHeight = () => {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const width = document.body.clientWidth!
    const unitWidth = width / 16
    setHeight(unitWidth * 9)
  }, [])

  return height
}

export default () => {
  const height = useHeight()

  return (
    <div
      className={"w-screen h-screen bg-no-repeat bg-cover flex"}
      style={{backgroundImage: `url(${BG.src})`}}
    >

      <div className={"w-full relative"} style={{height: height + 'px'}}>
        <MenuIndicator/>

        
      </div>

      {/*<Cursor/>*/}
    </div>
  )
}
