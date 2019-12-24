import React, {useEffect} from 'react'
import "./index.scss"

type Props = {
  column: number,
  row: number,
  itemBackgroundColor: string,
  border?: {
    width?: number,
    style?: string,
    color?: string,
  }
}

/**
 *
 * column
 * |-----|-----|-----| row
 * |-----|-----|-----|
 * |-----|-----|-----|
 * |-----|-----|-----|
 *
 */


/**
 *
 * @param column - 列数
 * @param row - 行数
 * @param itemBackgroundColor - 必填 内部元素的背景颜色
 * @param border - 边框属性
 *
 * @param children
 * @param resetProps
 * @constructor
 */
const BorderOverlap: React.FC<Props> = (
  {
    children,
    column,
    row,
    itemBackgroundColor,
    border = {
      width: 1,
      style: "dashed",
      color: "#bfbf90",
    },
    ...resetProps
  }
) => {
  const borderOverlapRef = React.useRef(null)

  useEffect(() => {
    if (!itemBackgroundColor) {
      console.warn("place pass <<itemBackgroundColor>> prop")
      return;
    }


    const root: HTMLDivElement = borderOverlapRef.current
    const children: any[] = Array.from(root.children)

    if (children.length === 0) {
      return
    }

    const bounding = children[0].getBoundingClientRect()
    root.style.width = `${bounding.width * column}px`

    const percent = 100 / column

    const margin = `-${border.width}px `.repeat(4)

    children.forEach(item => {
      item.style.width = percent + "%"
      item.style.borderColor = border.color
      item.style.borderWidth = border.width + "px"
      item.style.borderStyle = border.style

      item.style.backgroundColor = itemBackgroundColor
      item.style.margin = margin
    })
  }, [children])

  return <div
    ref={borderOverlapRef}
    className={"border-overlap"}
    children={children}
    {...resetProps}
  />
}

export default BorderOverlap
