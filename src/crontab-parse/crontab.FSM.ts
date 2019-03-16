import {
    CrontabRange,
    CrontabTime,
    ICrontab,
    ICrontabName
}              from "./defined";
import {range} from "./utils";

export class CrontabFSM {
    nowCrontabTime: ICrontabName | string
    crontab: ICrontab = {
        Second: "",
        Minute: "",
        Month:  "",
        Hour:   "",
        Day:    "",
        Week:   "",
    }

    constructor(private input: string) {

    }

    parse() {
        this.nowCrontabTime = "Second"

        let len = 0

        while (len !== this.input.length) {
            const c = this.input[len]
            len += 1

            // 如果当前值为数字
            if (this.isNum(c)) {
                this.crontab[this.nowCrontabTime] += c
                continue
            }

            if (this.isSpace(c)) {
                const crontabValue  = CrontabTime[this.nowCrontabTime] + 1
                this.nowCrontabTime = CrontabTime[crontabValue]

                if (crontabValue > CrontabTime.Week) {
                    throw new Error("当前 crontabTime 超出上限")
                }
                continue
            }

            if (this.isQuestionMark(c)) {
                this.crontab[this.nowCrontabTime] = null
                continue
            }

            if (this.isStar(c)) {
                const crontabRange                = CrontabRange[this.nowCrontabTime]
                this.crontab[this.nowCrontabTime] = range(crontabRange.min, crontabRange.max).join(",")
                continue
            }

            throw new Error("未知错误" + c)
        }

        if (CrontabTime[this.nowCrontabTime] !== CrontabTime.Week) {
            throw new Error("本程序仅支持格式为 秒 分 时 种 日 月 的表达式格式,传入格式不符合期望,请检查表达式")
        }

        return this.crontab
    }

    isSpace(v) {
        return /^\s/.test(v)
    }

    isQuestionMark(v) {
        return v === "?"
    }

    isNum(v) {
        return /^[0-9]$/.test(v)
    }

    isStar(v) {
        return v === "*"
    }
}

const example1 = "5 4 * * * ?"
const example2 = "0 6 * ? * *"
const example3 = "0 4 1 1 *"
const example4 = "0 0 4 1 1 *"

const fsm = new CrontabFSM(example4)
console.log(fsm.parse())

/*
* 状态转换
*
* 读取第一个字符, 必须是 '*' 或者 数字              -- 秒
* 终止符为  (空格)
*
* 读取第二个字符, 必须是 '*' 或者 数字              -- 分
* 终止符为  (空格)
*
* 读取第三个字符, 必须是 '*' 或者 数字              -- 时
* 终止符为  (空格)
*
* 读取第四个字符, 必须是 '*' 或者 数字 或者 '?'     -- 日
* 终止符为  (空格)
*
* 读取第五个字符, 必须是 '*' 或者 数字              -- 月
* 终止符为  (空格)
*
* 读取第六个字符, 必须是 '*' 或者 数字 或者 '?'     -- 周
* 终止符为  (空格)
*
* */



