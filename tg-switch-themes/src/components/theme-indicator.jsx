import { useThemeContext } from "../theme.jsx";
import Lottie from "lottie-react";
import animationJSON from "../assets/animation_lnl7fsiq.json";
import { useEffect, useRef } from "react";

export function ThemeIndicator(props) {
  const themeContext = useThemeContext()

  /**
   * @type {import("lottie-react").LottieRef}
   */
  const lottieRef = useRef()
  const firstTime = useRef(true)

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false
      lottieRef.current.setSpeed(1.5)
      return
    }
    if (themeContext.mode === "light") {
      lottieRef.current.playSegments([0, 90], true)
    } else {
      lottieRef.current.playSegments([90, 0], true);
    }
  }, [themeContext.mode]);

  return <Lottie
    lottieRef={lottieRef}
    className={"cursor-pointer w-10 h-10 relative z-20 bg-transparent"}
    autoplay={false}
    loop={false}
    onClick={props.onClick}
    animationData={animationJSON}
  />
}
