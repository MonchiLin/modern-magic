type ConsConfig = {
  token: CountdownTimer["token"],
  log?: boolean,
  mode?: "interval" | "RAF",
  precision?: number
}

type CountdownListener = (v: number) => void

type CountdownTimer = {
  token: string | number | symbol,
  clear: (...args) => void
}

type Handle = {
  timer: any
}

type CountdownConfig = {
  from: number,
  to: number,
  step: number,
  timeout?: number,
  complete?: () => void,
  start?: () => void,
}

export {
  CountdownListener,
  CountdownTimer,
  Handle,
  CountdownConfig,
  ConsConfig,
}
