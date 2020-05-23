const isOperator = (s) => /([+\-*\/])/.test(s);
const isNumber = (s) => /^[0-9]/.test(s);
const isWord = (s) => /^[a-z]/.test(s);
const isBrackets = (s) => /([()])/.test(s);
const isLeftBrackets = (s) => /\(/.test(s);
const isRightBrackets = (s) => /\)/.test(s);
const isSpace = (s) => /\s/.test(s);
export { isBrackets, isNumber, isWord, isOperator, isSpace, isLeftBrackets, isRightBrackets };
//# sourceMappingURL=re.js.map