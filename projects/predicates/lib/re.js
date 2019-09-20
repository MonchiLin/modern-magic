"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isOperator = (s) => /([+\-*\/])/.test(s);
exports.isOperator = isOperator;
const isNumber = (s) => /^[0-9]/.test(s);
exports.isNumber = isNumber;
const isWord = (s) => /^[a-z]/.test(s);
exports.isWord = isWord;
const isBrackets = (s) => /([()])/.test(s);
exports.isBrackets = isBrackets;
const isLeftBrackets = (s) => /\(/.test(s);
exports.isLeftBrackets = isLeftBrackets;
const isRightBrackets = (s) => /\)/.test(s);
exports.isRightBrackets = isRightBrackets;
const isSpace = (s) => /\s/.test(s);
exports.isSpace = isSpace;
//# sourceMappingURL=re.js.map