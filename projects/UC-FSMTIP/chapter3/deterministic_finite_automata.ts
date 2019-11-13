const l = console.log.bind(console)

// state       -> 状态
// next_state  -> 下一个状态
// character   -> 输入


/**
 * 用于构建 FA 的规则
 * 具有如下功能
 * 1. 判断一个输入(state, character)能否应用在当前规则上
 * 2. 返回下一个状态
 */
class FARule {
    constructor(
        public state,
        public character,
        public next_state
    ) {
    }

    applies_to(state, character) {
        return this.state === state && this.character === character
    }

    follow() {
        return this.next_state
    }

    toString() {
        return `#<FARule ${this.state} --${this.character}--> ${this.next_state}>`
    }

    static new(state, character, next_state) {
        return new FARule(state, character, next_state)
    }
}

/**
 * 用于管理 DFA 的规则
 * 具有如下功能
 * 1. 接受一个规则，然后跳转到该规则的下一个状态
 * 2. 根据规则找到对应的示例对象 FARule.new
 */
class DFARulebook {

    constructor(public rules) {

    }

    next_state(state, character) {
        return this.rule_for(state, character).follow()
    }

    rule_for(state, character) {
        return this.rules.find(rule => rule.applies_to(state, character))
    }

    static new(rules) {
        return new DFARulebook(rules)
    }
}

/**
 * 用于创建 DFA
 */
class DFA {

    constructor(
        public current_state,
        public accept_states,
        public rulebook
    ) {

    }

    /**
     * 判断当前状态是否处于接受状态
     */
    accepting() {
        return this.accept_states.includes(this.current_state)
    }

    read_character(character) {
        // 传递当前状态给 rulebook, 然后获取下一个状态
        this.current_state = this.rulebook.next_state(this.current_state, character)
    }

    // 遍历字符串，然后改变当前状态
    read_string(string: string) {
        string.split("")
            .forEach(s => {
                this.read_character(s)
            })
        return this
    }

    static new(current_state, accept_states, rulebook) {
        return new DFA(current_state, accept_states, rulebook)
    }
}

/**
 * 相当于 DFA 的 Builder
 */
class DFADesign {

    constructor(
        public start_state,
        public accept_states,
        public rulebook
    ) {
    }

    // 构建一个 DFA 示例
    to_dfa() {
        return DFA.new(this.start_state, this.accept_states, this.rulebook)
    }

    // 判断当前状态是否可以接受传入的字符串
    accept(string) {
        return this.to_dfa()
            .read_string(string)
            .accepting()
    }

    static new(start_state,
               accept_states,
               rulebook) {
        return new DFADesign(start_state, accept_states, rulebook)
    }

}

const rulebook = DFARulebook.new([
    FARule.new(1, "a", 2), FARule.new(1, "b", 1),
    FARule.new(2, "a", 2), FARule.new(2, "b", 3),
    FARule.new(3, "a", 3), FARule.new(3, "b", 3),
])

let dfa = DFA.new(1, [1, 3], rulebook)

l(dfa.accepting())

dfa.read_character("b")

l(dfa.accepting())

const dfa_design = DFADesign.new(1, [3], rulebook)
l(dfa_design.accept("a"))





