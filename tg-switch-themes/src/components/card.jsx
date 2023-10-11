import { useThemeContext } from "../theme.jsx";
import classNames from "classnames";
import AvatarSource from '../assets/Walter_White_S5B.png'
import { ThemeIndicator } from "./theme-indicator.jsx";

export function Card(props) {
  const {theme} = useThemeContext()

  return <div
    className={classNames("flex flex-col w-full justify-between h-full")}
    style={{backgroundColor: theme.cardBGColor}}
  >
    <div className={"p-4 flex-1 flex flex-col relative items-start justify-center font-breaking-bad text-3xl"}>
      <div className={"absolute right-2 top-2"}>
        <ThemeIndicator onClick={props.handleSwitch}/>
      </div>
      <p className={"font-bold"} style={{color: theme.text}}>
        Say my name.
      </p>
      <p className={"font-bold"} style={{color: theme.text}}>
        Heisenberg.
      </p>
      <p className={"font-bold"} style={{color: theme.text}}>
        You're god damn right.
      </p>
    </div>
    <div
      style={{backgroundImage: `url(${AvatarSource})`}}
      className={"w-full h-[300px] bg-contain bg-no-repeat bg-bottom"}
    />
  </div>
}
