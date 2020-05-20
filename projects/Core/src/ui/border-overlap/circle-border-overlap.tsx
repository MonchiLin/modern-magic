import React from "react";
import BorderOverlap, {BorderOverlapProps} from "./border-overlap";


type CircleBorderOverlapProps = {
  borderRadius: string,
  border?: {
    width: number,
    color: string,
    style: string,
  },
} & BorderOverlapProps

const CircleBorderOverlap: React.FC<CircleBorderOverlapProps> = (
  {
    borderRadius,
    style,
    border,
    ...resetProps
  }
) => {


  return <BorderOverlap
    style={{
      ...style,
      borderRadius: borderRadius,
      overflow: "hidden",
      borderWidth: border.width,
      borderColor: border.color,
      borderStyle: border.style,
    }}
    {...resetProps} />
}

export default CircleBorderOverlap

export {
  CircleBorderOverlapProps
}
