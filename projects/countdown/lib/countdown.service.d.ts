import { ConsConfig, CountdownConfig, CountdownListener, CountdownTimer } from './type';
declare class CountdownService {
    private config;
    private currentTime;
    private listeners;
    private infoForRectification;
    private handle;
    private countdownConfig;
    private readonly requestInterval;
    isSuspend: boolean;
    /**
     * 终止当前 timer
     */
    clearRequestInterval(): void;
    /**
     * 尝试从 timerWorker 中清除指定 token
     * @param token
     */
    tryRemoveTimerByToken(token: any): void;
    warn(...args: any[]): void;
    /**
     * @param config.token     若未按照类型提示传入空的 token 则随机生成一个 token
     * @param config.log       是否开启 log
     * @param config.mode      定时器的实现
     * @param config.precision 精度，单位为毫秒，用于自动矫正时间
     */
    constructor(config: ConsConfig);
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
    countdown({ from, to, step, complete, start, timeout }: CountdownConfig): void;
    /**
     * 增加 listener，每次会被定时器回调
     * @param listener
     */
    addListener(listener: CountdownListener): void;
    /**
     * 矫正时间
     */
    rectifyTime(): void;
    /**
     * 暂停当前倒计时
     */
    suspend(): void;
    /**
     * 继续当前倒计时
     * 使用外部 最后一次 调用 countdown 方法的参数，startTime 使用调用 suspend() 时的值
     */
    keepOn(): void;
    /**
     * 重新倒计时
     * 使用外部 最后一次 调用 countdown 方法的参数
     */
    restart(): void;
    /**
     * 清理定时器
     */
    destroy(): void;
}
export default CountdownService;
export { CountdownListener, CountdownTimer, CountdownConfig, };
//# sourceMappingURL=countdown.service.d.ts.map