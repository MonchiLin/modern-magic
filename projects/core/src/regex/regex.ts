export const isPhoneNumber = (phone: string) => /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/.test(phone);

export const isCapital = (s: string) => /^[A-Z]+$/.test(s);

export const isEmail = (s: string) => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(s);

export const isID = (s: string) => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s);

export const isNumber = (s: string) => /[0-9]/.test(s);

// @ts-ignore
export const isScientificNotation = (x: string) => /[+\-]?[^\w]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)/.test(x);
