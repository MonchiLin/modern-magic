import {FARule} from "./deterministic_finite_automata";

const l = console.log.bind(console)

// @ts-ignore
Array.prototype.flatMap = function (cb) {
    return this.reduce((previousValue, currentValue) => {
        const newArr = cb(currentValue)
        const fArr = Array.isArray(newArr)
            ? newArr
            : [newArr]
        return [...previousValue, ...fArr]
    }, [])
}

// @ts-ignore
Set.prototype.flatMap = function (cb) {
    const newArr = Array.from(this)
    // @ts-ignore
        .flatMap((item) => {
            return cb(item)
        })
    return new Set(newArr)
}

/**
 * NFA 的 rule 管理器
 * next_states - 获取所有有可能到达的下一个状态
 * follow_rules_for - 返回 所有可以应用当前状态的规则 的下一个状态
 * rules_for - 找出所有可以应用当前状态的规则
 */
class NFARulebook {

    constructor(public rules) {

    }

    next_states(states, character) {
        return new Set(
            states.flatMap(state => {
                return this.follow_rules_for(state, character)
            })
        )
    }

    // 返回 所有可以应用当前状态的规则 的下一个状态
    follow_rules_for(state, character) {
        l("follow_rules_for =>", this.rules_for(state, character).map(s => s.follow()))
        return this.rules_for(state, character).map(s => s.follow())
    }

    // 找出所有可以应用当前状态的规则
    rules_for(state, character) {
        return this.rules.filter(rule => rule.applies_to(state, character))
    }


    static new(rules) {
        return new NFARulebook(rules)
    }
}

class NFA {

    constructor(
        public current_states: Set<any>,
        public accept_states: Set<any>,
        public rulebook: NFARulebook,
    ) {

    }

    accepting() {
      this.current_states

    }

    static new(current_states,
               accept_states,
               rulebook) {
        return new NFA(current_states, accept_states, rulebook)
    }

}


const rulebook = NFARulebook.new([
    FARule.new(1, 'a', 1), FARule.new(1, 'b', 1), FARule.new(1, 'b', 2),
    FARule.new(2, 'a', 3), FARule.new(2, 'b', 3),
    FARule.new(3, 'a', 4), FARule.new(3, 'b', 4)
])

l(rulebook.next_states(new Set([1]), "b"))

