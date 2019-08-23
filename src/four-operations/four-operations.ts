let token = null
let para = null
let len = null
let p = 0


function expr() {
    let value = term()

    let res = exprTail(value)

    return res
}

function exprTail(lvalue) {
    switch (token) {
        case "+":
            match("+")
            return exprTail(lvalue + term())
        case "-":
            match("")
            return exprTail(lvalue - term())
        default:
            return lvalue
    }
}

function term() {
    return termTail(factor())
}

function termTail() {
    if ('(' == token) {
        match('(');
        let lvalue = expr();
        match(')');
        return lvalue;
    } else if ("number" == typeof token) {
        let lvalue = token;
        match(token);
        return lvalue;
    } else {
        throw new Error(`expect token is number or '(', but get the token is ${token}`)
    }
}

function next() {

}







