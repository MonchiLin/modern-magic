export interface IRange {
    min: number,
    max: number,
}

export type CrontabTimeLiteral<R> = { [key in keyof typeof CrontabTime]: R }

export enum CrontabTime {
    Second,
    Minute,
    Hour,
    Day,
    Month,
    Week
}

export type ICrontab = CrontabTimeLiteral<string>
export type ICrontabName = keyof CrontabTimeLiteral<string>

export const CrontabRange: CrontabTimeLiteral<IRange> = {
    Second: {
        min: 0,
        max: 59
    },
    Minute: {
        min: 0,
        max: 59
    },
    Hour:   {
        min: 0,
        max: 23
    },
    Day:    {
        min: 1,
        max: 31
    },
    Month:  {
        min: 1,
        max: 12
    },
    Week:   {
        min: 0,
        max: 7
    },
}











