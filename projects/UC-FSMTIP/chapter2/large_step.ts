class Environment {
    io

    constructor(io = {}) {
        this.io = io
    }

    get(key) {
        return this.io[key]
    }

    toString() {
        const body = Object.keys(this.io)
            .reduce((previousValue, currentValue) => {
                 return previousValue + `${currentValue} =>«${this.io[currentValue]}», `
            }, "")

        return `{ ${body.slice(0, body.length - 2)} }`
    }

    toNative() {
        return this.io
    }

    merge(o) {
        return new Environment({
            ...this.io,
            ...o
        })
    }

}

class Num {
    value

    constructor(value) {
        this.value = value
    }

    toString() {
        return this.value.toString()
    }

    inspect() {
        return `<${this}>`
    }

    reducible() {
        return false
    }

}


class Add {
    left
    right

    constructor(left, right) {
        this.left = left
        this.right = right
    }

    toString() {
        return `${this.left} + ${this.right}`
    }

    inspect() {
        return `<${this}>`
    }

    reducible() {
        return true
    }

    reduce(environment) {
        if (this.left.reducible()) {
            return new Add(this.left.reduce(environment), this.right)
        } else if (this.right.reducible()) {
            return new Add(this.left, this.right.reduce(environment))
        } else {
            return new Num(this.left.value + this.right.value)
        }
    }
}


class Multiply {
    left
    right

    constructor(left, right) {
        this.left = left
        this.right = right
    }

    toString() {
        return `${this.left} * ${this.right}`
    }

    inspect() {
        return `<${this}>`
    }

    reducible() {
        return true
    }

    reduce(environment) {
        if (this.left.reducible()) {
            return new Add(this.left.reduce(environment), this.right)
        } else if (this.right.reducible()) {
            return new Add(this.left, this.right.reduce(environment))
        } else {
            return new Num(this.left.value * this.right.value)
        }
    }
}

class Machine {
    statement
    environment

    constructor(statement, environment) {
        this.statement = statement
        this.environment = environment
    }

    step() {
        const executeResult = this.statement.reduce(this.environment)
        this.statement = executeResult[0]
        this.environment = executeResult[1]
    }

    inspect() {
        console.log(`${this.statement}, ${this.environment}`)
    }

    run() {
        while (this.statement.reducible()) {
            this.inspect()
            this.step()
        }

        this.inspect()
    }

}

class Bool {
    value

    constructor(value) {
        this.value = value
    }

    toString() {
        return this.value.toString()
    }

    inspect() {
        return `<${this}>`
    }

    reducible() {
        return false
    }

    eq(other) {
        return other === this.value
    }

}

class LessThan {

    left
    right

    constructor(left, right) {
        this.left = left
        this.right = right
    }

    toString() {
        return `${this.left} < ${this.right}`
    }

    inspect() {
        return `<${this}>`
    }

    reducible() {
        return true
    }

    reduce(environment) {
        if (this.left.reducible()) {
            return new LessThan(this.left.reduce(environment), this.right)
        } else if (this.right.reducible()) {
            return new LessThan(this.left, this.right.reduce(environment))
        } else {
            return new Bool(this.left.value < this.right.value)
        }
    }
}

class Variable {
    name

    constructor(name) {
        this.name = name
    }

    toString() {
        return this.name.toString()
    }

    inspect() {
        return `<${this}>`
    }

    reducible() {
        return true
    }

    reduce(enviroment) {
        return enviroment.get(this.name)
    }

}

class DoNothing {

    toString() {
        return 'do-nothing'
    }

    inspect() {
        return `<${this}>`
    }

    eq(otherStatement) {
        return otherStatement instanceof DoNothing
    }

    reducible() {
        return false
    }

}

class Assign {
    name
    expression

    constructor(name, expression) {
        this.name = name
        this.expression = expression
    }


    toString() {
        return `<${this.name} = ${this.expression}>`
    }

    inspect() {
        return `<${this}>`
    }

    reducible() {
        return true
    }

    reduce(enviroment) {
        if (this.expression.reducible()) {
            return [
                new Assign(this.name, this.expression.reduce(enviroment)),
                enviroment
            ]
        } else {
            return [
                new DoNothing(),
                enviroment.merge({[this.name]: this.expression})
            ]
        }
    }
}

class If {
    condition
    consequence
    alternative

    constructor(condition, consequence, alternative) {
        this.condition = condition
        this.consequence = consequence
        this.alternative = alternative
    }

    toString() {
        return `if (${this.condition}) { ${this.consequence} else ${this.alternative}}`
    }

    inspect() {
        return `${this}`
    }

    reducible() {
        return true
    }

    reduce(enviroment) {
        if (this.condition.reducible()) {
            return [new If(this.condition.reduce(enviroment), this.consequence, this.alternative), enviroment]
        } else {
            if (new Bool(true).eq(this.condition)) {
                return [this.consequence, enviroment]
            } else {
                return [this.alternative, enviroment]
            }
        }
    }

}

class Sequence {
    first
    second

    constructor(first, second) {
        this.first = first
        this.second = second
    }

    toString() {
        return `${this.first}; ${this.second}`
    }

    inspect() {
        return `<${this}>`
    }

    reducible() {
        return true
    }

    reduce(enviorment) {
        if (this.first instanceof DoNothing) {
            return [this.second, enviorment]
        } else {
            const [reduced_first, reduced_environment] = this.first.reduce(enviorment)
            return [new Sequence(reduced_first, this.second), reduced_environment]
        }
    }

}

class While {
    condition
    body

    constructor(condition, body) {
        this.condition = condition
        this.body = body
    }

    toString() {
        return `While (${this.condition}) { ${this.body} }`
    }

    inspect() {
        return `${this}`
    }

    reducible() {
        return true
    }

    reduce(environment) {
        return [
            new If(this.condition, new Sequence(this.body, this), new DoNothing()),
            environment
        ]
    }

}

const m = new Machine(
    new While(
        new LessThan(new Variable("x"), new Num(5)),
        new Assign("x",
            new Multiply(
                new Variable("x"),
                new Num(3)
            )
        ),
    ),
    new Environment({x: new Num(1)})
)

m.run()


