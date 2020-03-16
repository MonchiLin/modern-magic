declare type ConsConfig = {
    token: CountdownTimer["token"];
    log?: boolean;
    mode?: "interval" | "RAF";
    precision?: number;
};
declare type CountdownListener = (v: number) => void;
declare type CountdownTimer = {
    token: string | number | symbol;
    clear: (...args: any[]) => void;
};
declare type Handle = {
    timer: any;
};
declare type CountdownConfig = {
    from: number;
    to: number;
    step: number;
    timeout?: number;
    complete?: () => void;
    start?: () => void;
};
export { CountdownListener, CountdownTimer, Handle, CountdownConfig, ConsConfig, };
//# sourceMappingURL=type.d.ts.map