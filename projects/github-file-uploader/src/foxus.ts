import {DirectiveOptions} from 'vue'
import anime from "animejs";
import {BehaviorSubject} from "rxjs";
import "./css/foxus.scss"

/**
 * 朴实无华且枯燥的 cursor，用于代替 popover
 */

const FoxusObservable = new BehaviorSubject([])

const registerFoxus = ({id, el}: { id: string, el: HTMLElement }) => {

}

let outerCircle: HTMLElement = null
let innerCircle: HTMLElement = null

const foxusInit = () => {
  const el = document.createElement("div")
  outerCircle = document.createElement("div")
  innerCircle = document.createElement("div")

  el.classList.add("v-foxuc-el")
  outerCircle.classList.add("outer-circle")
  innerCircle.classList.add("inner-circle")

  document.body.append(el)
  el.append(outerCircle)
  el.append(innerCircle)

  const outerBounding = outerCircle.getBoundingClientRect()
  const innerBounding = innerCircle.getBoundingClientRect()

  window.addEventListener("mousemove", (e) => {
    const {x, y} = e
    anime.timeline({
      easing: 'easeOutExpo',
      targets: innerCircle,
      left: x - innerBounding.width / 2 + 'px',
      top: y - innerBounding.height / 2 + 'px',
      duration: 50
    })
      .add({
        targets: outerCircle,
        left: x - outerBounding.width / 2 + 'px',
        top: y - outerBounding.height / 2 + 'px',
        delay: 20,
        duration: 100
      })
  })
}

const onHover = (e: MouseEvent) => {
  // @ts-ignore
  // const message = e.target.dataset.foxucMessgae
  anime({
    targets: innerCircle,
    scale: 2,
    duration: 500,
    easing: "easeOutQuint",
    opacity: 0.2,
  })
}

const onLeave = (e: MouseEvent) => {
  anime({
    targets: innerCircle,
    scale: 1,
    duration: 500,
    easing: "easeInCirc",
    opacity: 1,
  })
}

const vFoxus: DirectiveOptions = {
  bind(el, binding) {
    el.dataset.foxucMessgae = binding.value
  },
  inserted(el, binding) {
    el.addEventListener("mouseenter", onHover)
    el.addEventListener("mouseleave", onLeave)
  },
  update(el, binding) {
    el.dataset.foxucMessgae = binding.value
  },
  componentUpdated(el, binding) {

  },
  unbind() {

  }
}

export {
  vFoxus,
  FoxusObservable,
  foxusInit
}

