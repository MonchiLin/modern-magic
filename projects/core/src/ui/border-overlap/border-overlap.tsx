import React, {useEffect} from 'react'
import "./index.scss"

export type BorderOverlapProps = {
  column: number,
  row: number,
  itemBackgroundColor: string,
  itemBorder?: {
    width?: number,
    style?: string,
    color?: string,
  }
} & React.HTMLAttributes<any>

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
 * @param itemBorder - 边框属性
 *
 * @param children
 * @param resetProps
 * @constructor
 */
const BorderOverlap: React.FC<BorderOverlapProps> = (
  {
    children,
    column,
    row,
    itemBackgroundColor,
    itemBorder = {
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
    root.style.height = `${bounding.height * row}px`

    const percent = 100 / column

    const margin = `-${itemBorder.width}px `.repeat(4)

    children.forEach(item => {
      item.style.width = percent + "%"
      item.style.borderColor = itemBorder.color
      item.style.borderWidth = itemBorder.width + "px"
      item.style.borderStyle = itemBorder.style

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
