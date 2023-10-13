import { CardContainer } from "./components/card-container.jsx";
import { Card } from "./components/card.jsx";
import { useRef } from "react";
import { useThemeContext } from "./theme.jsx";
import { crop, toCanvas } from "./utils.js";
import BreakingBadSource from "./assets/breaking_bad.png";

function App() {
  const containerRef = useRef()
  const parentRef = useRef()
  const canvasRef = useRef()
  const themeContext = useThemeContext()

  const handleSwitch = (event) => {
    toCanvas(containerRef.current)
      .then(canvas => {
        canvasRef.current = canvas
        parentRef.current.appendChild(canvas)
        setTimeout(() => {
          crop(
            canvas,
            event,
            {reverse: themeContext.mode === "dark"}
          ).then(() => {
            parentRef.current.removeChild(canvas)
          })
          themeContext.toggleTheme()
        }, 1)
      })
  }

  return <div
    ref={parentRef}
    className={"relative w-screen h-screen flex flex-row justify-evenly items-center"}
  >
    <img
      alt={"Breaking Bad"}
      src={BreakingBadSource}
      className={"w-[45%] self-start"}
    />
    <CardContainer ref={containerRef}>
      <Card handleSwitch={handleSwitch}/>
    </CardContainer>
  </div>
}

export default App
