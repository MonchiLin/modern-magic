import React, {useEffect} from "react";
import "./swiper.css"

const id = _ => _

type Props = {
  initial?: number,
  autoPlay?: boolean,
  duration?: number,
  onChange?: (item) => void
}

const log = (...args) => console.log("swiper", ...args)

const Swiper: React.FC<Props> = (props) => {
  const {
    initial = 0,
    autoPlay = false,
    duration = 300,
    onChange = id
  } = props


  const swiperRef = React.useRef<HTMLDivElement>(null)
  const swiperContainerRef = React.useRef<HTMLDivElement>(null)
  // const [itemIndex, updateItemIndex] = React.useState(initial)

  useEffect(() => {
    const swiperContainer: any = swiperContainerRef.current
    const initialPosition = swiperContainer.getBoundingClientRect()

    const children = swiperContainer.children

    const item = children[0]

    if (!item) {
      return
    }

    const itemWith = item.getBoundingClientRect().width

    let index = initial

    // 当前 left 位置
    let left = 0 - itemWith * index

    updateContainerPosition()

    // 是否触发移动事件
    let moveable = false

    let preViousEvent = null
    let currentEvent = null


    function onContainerMouseDown(e) {
      moveable = true
      preViousEvent = e
      currentEvent = e


      log("onContainerMouseDown", e)
    }

    function onContainerMouseMove(e) {
      if (!moveable) {
        return
      }

      // log(e.pageX, preViousEvent.pageX)

      if (e.pageX < preViousEvent.pageX) {
        left += e.pageX - preViousEvent.pageX
      } else {
        left += e.pageX - preViousEvent.pageX
      }

      updateContainerPosition()
      preViousEvent = e
      // log("onContainerMouseMove", e)
    }


    function onContainerMouseUp(e) {
      moveable = false

      if (e.pageX < currentEvent.pageX) {
        index = index >= children.lenght - 1
          ? children.lenght - 1
          : index + 1
      } else {
        index = index <= 0
          ? 0
          : index - 1
      }

      left = 0 - itemWith * index

      swiperContainer.classList.add("move")

      swiperContainer.addEventListener('transitionend', () => {
        swiperContainer.classList.remove("move")
      })


      updateContainerPosition()

      log("onContainerMouseUp", e)
    }

    function updateContainerPosition() {
      swiperContainer.style.left = `${left}px`
    }


    // function onMouseDown(e) {
    //   log("onMouseDown", e)
    // }
    // function onMouseMove(e) {
    //   log("onMouseMove", e)
    // }
    // function onMouseUp(e) {
    //   log("onMouseUp", e)
    // }

    swiperContainer.addEventListener("mousedown", onContainerMouseDown)
    swiperContainer.addEventListener("mousemove", onContainerMouseMove)
    swiperContainer.addEventListener("mouseup", onContainerMouseUp)

    return () => {
      swiperContainer.removeEventListener("mousedown", onContainerMouseDown)
      swiperContainer.removeEventListener("mousemove", onContainerMouseMove)
      swiperContainer.removeEventListener("mouseup", onContainerMouseUp)
    }
  }, [])

  const to = (index) => {

  }

  return (
    <div className={"swiper"} ref={swiperRef}>

      <div className="swiper-container" ref={swiperContainerRef}>

        <div className="swiper-item1">1</div>
        <div className="swiper-item2">2</div>
        <div className="swiper-item3">3</div>

      </div>

    </div>
  )
}

export default Swiper
