"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isOperator = (s) => /([+\-*\/])/.test(s);
exports.isOperator = isOperator;
const isNumber = (s) => /^[0-9]*$/.test(s);
exports.isNumber = isNumber;
const isBrackets = (s) => /^[0-9]*$/.test(s);
exports.isBrackets = isBrackets;
//# sourceMappingURL=index.js.map