var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var timeWorkers = [];
import day from 'dayjs';
/**
 * 格式化 13 位时间戳
 * @param timeStamp
 * @param format
 */
function dateFormatter(timeStamp, format) {
    if (format === void 0) { format = "YYYY/MM/DD HH:mm:ss"; }
    return day(timeStamp).format(format);
}
var noop = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
};
var CountdownService = /** @class */ (function () {
    /**
     * @param config.token     若未按照类型提示传入空的 token 则随机生成一个 token
     * @param config.log       是否开启 log
     * @param config.mode      定时器的实现
     * @param config.precision 精度，单位为毫秒，用于自动矫正时间
     */
    function CountdownService(config) {
        this.config = config;
        // 当前倒计时的时间
        this.currentTime = 0;
        this.listeners = [];
        // 一些用于矫正时间的数据
        this.infoForRectification = {
            startTime: 0,
            endTime: 0
            // expectedTime: 0,
        };
        // 有可能使用 requestAnimationFrame 来模拟 setInterval 所以使用 timer 包一层
        this.handle = {
            timer: null
        };
        // 储存倒计时的配置，用于暂停后恢复倒计时使用
        this.countdownConfig = null;
        // 是否处于暂停状态
        this.isSuspend = false;
        config.token = config.token || new Date().getTime() * Math.random();
        config.log = config.log || false;
        config.mode = config.mode || "RAF";
        config.precision = config.precision || 100;
        // 尝试根据 token 从 timerWorks 删除该 token
        this.tryRemoveTimerByToken(config.token);
        var inBrowser = typeof window === "undefined";
        // 若是在浏览器的环境中则默认使用 requestAnimationFrame 来实现，否则使用 setInterval 实现
        // 当然，若是手动指定定时器为 "interval" 则优先使用 setInterval
        this.requestInterval = inBrowser && config.mode === "RAF"
            ? function (fn, delay) {
                var timer = setInterval(fn, delay);
                return { timer: timer };
            }
            : function (fn, delay) {
                var start = new Date().getTime();
                var handle = {
                    timer: null
                };
                var loop = function () {
                    handle.timer = requestAnimationFrame(loop);
                    var current = new Date().getTime();
                    var delta = current - start;
                    if (delta >= delay) {
                        fn.call();
                        start = new Date().getTime();
                    }
                };
                handle.timer = requestAnimationFrame(loop);
                return handle;
            };
    }
    /**
     * 终止当前 timer
     */
    CountdownService.prototype.clearRequestInterval = function () {
        if (this.config.mode === "RAF") {
            cancelAnimationFrame(this.handle.timer);
        }
        else if (this.config.mode === "interval") {
            clearInterval(this.handle.timer);
        }
    };
    /**
     * 尝试从 timerWorker 中清除指定 token
     * @param token
     */
    CountdownService.prototype.tryRemoveTimerByToken = function (token) {
        timeWorkers = timeWorkers.filter(function (t) {
            if (t.token === token) {
                t.clear();
                return false;
            }
            else {
                return true;
            }
        });
    };
    CountdownService.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.config.log && console.warn.apply(console, __spread(["countdown.service ->"], args));
    };
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
    CountdownService.prototype.countdown = function (_a) {
        var _this = this;
        var from = _a.from, to = _a.to, step = _a.step, _b = _a.complete, complete = _b === void 0 ? noop : _b, _c = _a.start, start = _c === void 0 ? noop : _c, _d = _a.timeout, timeout = _d === void 0 ? 1000 : _d;
        if (typeof from !== "number" || typeof to !== "number") {
            this.warn("TypeError: <startTime> Or <endTime> is not a Number");
            return;
        }
        if (from < to) {
            this.warn("<startTime> should be greater than <endTime>");
            return;
        }
        // 起始时间 = 当前时间
        this.infoForRectification.startTime = new Date().getTime();
        // 期望结束时间 = 开始时间
        this.infoForRectification.endTime = this.infoForRectification.startTime + (from / step * 1000);
        console.log("开始时间 => ", dateFormatter(this.infoForRectification.startTime), "结束时间 =>", dateFormatter(this.infoForRectification.endTime));
        // 如果不是通过 keepOn 进来的，则保存配置参数
        if (!this.isSuspend) {
            // 储存参数
            this.countdownConfig = {
                from: from,
                to: to,
                step: step,
                complete: complete,
                start: start,
            };
        }
        start();
        if (from === to) {
            complete();
            return;
        }
        this.currentTime = from;
        this.handle = this.requestInterval(function () {
            if (_this.currentTime > to) {
                // 递减当前时间
                _this.currentTime -= step;
                // 矫正当前时间
                _this.rectifyTime();
                _this.listeners.forEach(function (cb) { return cb && cb(_this.currentTime); });
            }
            else {
                _this.clearRequestInterval();
                complete();
            }
        }, timeout);
        if (this.config.token !== "") {
            timeWorkers.push({ clear: this.clearRequestInterval, token: this.config.token });
        }
    };
    /**
     * 增加 listener，每次会被定时器回调
     * @param listener
     */
    CountdownService.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    /**
     * 矫正时间
     */
    CountdownService.prototype.rectifyTime = function () {
        // 当前期望的当前时间
        var now = new Date().getTime() - this.infoForRectification.startTime;
        var total = this.infoForRectification.endTime - this.infoForRectification.startTime;
        var timeOfAnticipation = this.countdownConfig.step * (total - now);
        console.log("剩余时间 =>", timeOfAnticipation, "ms");
        console.log("误差 =>", this.currentTime * 1000 - timeOfAnticipation, "ms");
        var offset = this.currentTime * 1000 - timeOfAnticipation;
        if (offset >= this.config.precision) {
            this.currentTime += offset / 1000;
        }
    };
    /**
     * 暂停当前倒计时
     */
    CountdownService.prototype.suspend = function () {
        if (this.isSuspend) {
            this.warn("it was suspended");
        }
        if (this.countdownConfig == null) {
            this.warn("please call countdown() first");
        }
        else {
            this.isSuspend = true;
            this.clearRequestInterval();
        }
    };
    /**
     * 继续当前倒计时
     * 使用外部 最后一次 调用 countdown 方法的参数，startTime 使用调用 suspend() 时的值
     */
    CountdownService.prototype.keepOn = function () {
        // 如果没有调用了暂停方法，或者 countdownConfig 还没有值
        if (!this.isSuspend || this.countdownConfig == null) {
            this.warn("please call suspend() first");
        }
        else {
            this.countdown(__assign(__assign({}, this.countdownConfig), { from: this.currentTime }));
            this.isSuspend = false;
        }
    };
    /**
     * 重新倒计时
     * 使用外部 最后一次 调用 countdown 方法的参数
     */
    CountdownService.prototype.restart = function () {
        if (this.countdownConfig == null) {
            this.warn("please call countdown() first");
        }
        else {
            this.countdown(this.countdownConfig);
        }
    };
    /**
     * 清理定时器
     */
    CountdownService.prototype.destroy = function () {
        // 有可能 handle 还不存在
        if (this.handle) {
            this.tryRemoveTimerByToken(this.config.token);
        }
        this.countdownConfig = null;
    };
    return CountdownService;
}());
export default CountdownService;
//# sourceMappingURL=countdown.service.js.map