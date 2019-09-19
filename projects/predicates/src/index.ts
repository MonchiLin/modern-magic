const isOperator = (s: string) => /([+\-*\/])/.test(s)
const isNumber = (s: string) => /^[0-9]*$/.test(s)
const isBrackets = (s: string) => /^[0-9]*$/.test(s)

export {
    isBrackets,
    isNumber,
    isOperator
}