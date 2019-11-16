const isOperator = (s: string) => /([+\-*\/])/.test(s);
const isNumber = (s: string) => /^[0-9]/.test(s);
const isWord = (s: string) => /^[a-z]/.test(s);
const isBrackets = (s: string) => /([()])/.test(s);
const isLeftBrackets = (s: string) => /\(/.test(s);
const isRightBrackets = (s: string) => /\)/.test(s);
const isSpace = (s: string) => /\s/.test(s);

export {
    isBrackets,
    isNumber,
    isWord,
    isOperator,
    isSpace,
    isLeftBrackets,
    isRightBrackets
}
