import {ConsConfig, CountdownConfig, CountdownListener, CountdownTimer, Handle} from './type'

let timeWorkers: CountdownTimer[] = []

const noop = (...args) => {
}


class CountdownService {
  // 当前倒计时的时间
  private currentTime = 0

  private listeners: CountdownListener[] = []

  // 一些用于矫正时间的数据
  private infoForRectification = {
    startTime: 0,
    endTime: 0
    // expectedTime: 0,
  }

  // 有可能使用 requestAnimationFrame 来模拟 setInterval 所以使用 timer 包一层
  private handle: Handle = {
    timer: null
  };

  // 储存倒计时的配置，用于暂停后恢复倒计时使用
  private countdownConfig: CountdownConfig = null

  private readonly requestInterval: (fn, delay) => { timer: any };

  // 是否处于暂停状态
  public isSuspend = false

  /**
   * 终止当前 timer
   */
  clearRequestInterval = () => {
    if (this.config.mode === "RAF") {
      cancelAnimationFrame(this.handle.timer)
    } else if (this.config.mode === "interval") {
      clearInterval(this.handle.timer)
    }
  }

  /**
   * 尝试从 timerWorker 中清除指定 token
   * @param token
   */
  tryRemoveTimerByToken(token) {
    timeWorkers = timeWorkers.filter(t => {
      if (t.token === token) {
        t.clear()
        return false
      } else {
        return true
      }
    })
  }

  warn(...args) {
    this.config.log && console.warn("countdown.service ->", ...args)
  }

  /**
   * @param config.token     若未按照类型提示传入空的 token 则随机生成一个 token
   * @param config.log       是否开启 log
   * @param config.mode      定时器的实现
   * @param config.precision 精度，单位为毫秒，用于自动矫正时间
   */
  constructor(private config: ConsConfig) {
    config.token = config.token || new Date().getTime() * Math.random()
    config.log = config.log || false
    config.mode = config.mode || "RAF"
    config.precision = config.precision || 100

    // 尝试根据 token 从 timerWorks 删除该 token
    this.tryRemoveTimerByToken(config.token)

    const inBrowser = typeof window === "undefined"

    // 若是在浏览器的环境中则默认使用 requestAnimationFrame 来实现，否则使用 setInterval 实现
    // 当然，若是手动指定定时器为 "interval" 则强制使用 setInterval
    this.requestInterval = inBrowser && config.mode === "RAF"
      ? (fn, delay) => {
        const timer = setInterval(fn, delay)
        return {timer: timer}
      }
      : (fn, delay) => {
        let start = new Date().getTime()
        const handle: Handle = {
          timer: null
        };

        const loop = () => {
          handle.timer = requestAnimationFrame(loop);
          const current = new Date().getTime()
          const delta = current - start;

          if (delta >= delay) {
            fn.call();
            start = new Date().getTime();
          }
        }

        handle.timer = requestAnimationFrame(loop);
        return handle;
      };
  }

  /**
   * 开始倒计时
   *
   * @param from      - 开始值
   * @param to        - 结束值
   * @param step      - 递减值
   * @param complete  - 完成时调用的回调函数
   * @param start     - 定时器开始之前的回调函数
   * @param timeout   - 定时器的速度，以毫秒为单位
   *
   */
  countdown(
    {
      from,
      to,
      step,
      complete = noop,
      start = noop,
      timeout = 1000
    }: CountdownConfig
  ) {
    if (typeof from !== "number" || typeof to !== "number") {
      this.warn("TypeError: <startTime> Or <endTime> is not a Number")
      return
    }

    if (from < to) {
      this.warn("<startTime> should be greater than <endTime>")
      return
    }

    // 起始时间 = 当前时间
    this.infoForRectification.startTime = new Date().getTime()

    // 期望结束时间 = 开始时间
    this.infoForRectification.endTime = this.infoForRectification.startTime + (from / step * 1000)

    // 如果不是通过 keepOn 进来的，则保存配置参数
    if (!this.isSuspend) {
      // 储存参数
      this.countdownConfig = {
        from,
        to,
        step,
        complete,
        start,
      }
    }

    start()

    if (from === to) {
      complete()
      return
    }

    this.currentTime = from
    this.handle = this.requestInterval(() => {
      if (this.currentTime > to) {
        // 递减当前时间
        this.currentTime -= step
        // 矫正当前时间
        if (!this.rectifyTime()) {
          return
        }
        this.listeners.forEach(cb => cb && cb(this.currentTime))
      } else {
        this.clearRequestInterval()
        complete()
      }
    }, timeout)

    if (this.config.token !== "") {
      timeWorkers.push({clear: this.clearRequestInterval, token: this.config.token})
    }
  }

  /**
   * 增加 listener，每次会被定时器回调
   * @param listener
   */
  addListener(listener: CountdownListener) {
    this.listeners.push(listener)
  }

  /**
   * 矫正时间
   */
  rectifyTime() {
    // 注：  this.infoForRectification.startTime 为本次倒计时的开始的时间点
    // 注：  this.infoForRectification.endTime   为本次倒计时的结束时时间点
    //  this.infoForRectification.endTime = 本次倒计时的开始的时间点 + 需要倒计时的时间
    //  这里楼主的代码已经

    // 倒计时开始后经过了多久 = 当前时间 - 倒计时开始的时间
    const now = new Date().getTime() - this.infoForRectification.startTime
    // 完成倒计时总需时间    = 倒计时的结束时时间点 - 倒计时开始的时间点
    const total = this.infoForRectification.endTime - this.infoForRectification.startTime
    // 期望的当前剩余时间    = 倒计时开始后经过了多久 - 完成倒计时总需时间 （step 先无视）
    const timeOfAnticipation = this.countdownConfig.step * (total - now)
    console.log("期望的当前剩余时间 =>", timeOfAnticipation / 1000, "s")
    console.log("实际当前剩余时间 =>", this.currentTime, "s")
    // 偏差 = 当前的倒计时 - 期望的当前剩余时间 / 1000 （因为期望的剩余时间是时间戳）
    const offset = this.currentTime - timeOfAnticipation / 1000
    console.log("误差 =>", offset, "s")

    // 处理离开屏幕太久的情况, 早就已经完成了倒计时，在调用函数的地方进行处理，若是返回 false 则认为已经倒计时结束
    if (offset > this.currentTime) {
      return false
    } else if (offset >= this.config.precision / 1000) {
      // this.config.precision：精度
      // 如果误差已经大于容许的偏差则矫正一次当前的倒计时
      this.currentTime -= offset
    }
    return true
  }

  /**
   * 暂停当前倒计时
   */
  suspend() {
    if (this.isSuspend) {
      this.warn("it was suspended")
    }
    if (this.countdownConfig == null) {
      this.warn("please call countdown() first")
    } else {
      this.isSuspend = true
      this.clearRequestInterval()
    }
  }

  /**
   * 继续当前倒计时
   * 使用外部 最后一次 调用 countdown 方法的参数，startTime 使用调用 suspend() 时的值
   */
  keepOn() {
    // 如果没有调用了暂停方法，或者 countdownConfig 还没有值
    if (!this.isSuspend || this.countdownConfig == null) {
      this.warn("please call suspend() first")
    } else {
      this.countdown({...this.countdownConfig, from: this.currentTime})
      this.isSuspend = false
    }
  }

  /**
   * 重新倒计时
   * 使用外部 最后一次 调用 countdown 方法的参数
   */
  restart() {
    if (this.countdownConfig == null) {
      this.warn("please call countdown() first")
    } else {
      this.countdown(this.countdownConfig)
    }
  }

  /**
   * 清理定时器
   */
  destroy() {
    // 有可能 handle 还不存在
    if (this.handle) {
      this.tryRemoveTimerByToken(this.config.token)
    }
    this.countdownConfig = null
  }

}

export default CountdownService
export {
  CountdownListener,
  CountdownTimer,
  CountdownConfig,
}
