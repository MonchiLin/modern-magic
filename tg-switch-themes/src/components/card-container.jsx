import { forwardRef } from "react";
import classNames from "classnames";

export const CardContainer = forwardRef((props, ref) => {
  return <div
    ref={ref}
    {...props}
    className={classNames("w-[308px]", props.className)}
    style={{
      boxShadow: "rgb(255 255 255 / 49%) 0px 0px 35px 8px"
    }}
  >
    {props.children}
  </div>
})
