type Primitives = string | number | symbol

type EventTypeMapping<I extends Primitives> = { [K in I]: unknown }

type TransitionMap<I extends Primitives, S, E extends EventTypeMapping<I>> = {
    /**
     *
     *
     *
     * E: Event， 每个状态都有一个可以接受该状态的 Event
     * I: 当前的状态 TODO ?
     * S: 一些额外的状态 TODO ?
     *
     * 最后返回下一个状态
     */
    [K in I]: (event: E[I], currentState: I, extraState: S) => I
}


class Machine<I extends Primitives, S, E extends EventTypeMapping<I>> {

    constructor(
        readonly state: S,
        readonly initialState: I,
        readonly transitions: TransitionMap<I, S, E>,
        public currentState: I = initialState
    ) {

    }

    step(event: E[I]): [I, I] {
        const currentState = this.currentState
        const newState = this.transitions[currentState](event, currentState, this.state)
        this.currentState = newState
        return [currentState, newState]
    }


}

export {
    Primitives,
    EventTypeMapping,
    TransitionMap,
    Machine
}


