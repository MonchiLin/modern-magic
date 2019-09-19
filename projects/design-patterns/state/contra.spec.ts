enum ContraEnumActions {
    Up,
    Forward,
    Backward,
    Down,
    Shoot,

}

const ContraActions = {
    [ContraEnumActions.Up]: () => console.log("up"),
    [ContraEnumActions.Forward]: () => console.log("forward"),
    [ContraEnumActions.Backward]: () => console.log("backward"),
    [ContraEnumActions.Down]: () => console.log("down"),
    [ContraEnumActions.Shoot]: () => console.log("shoot"),
}

class Contra {
    _currentState: ContraEnumActions[] = []

    constructor() {

    }

    changeState(...args: ContraEnumActions[]) {
        this._currentState = args.map(state => state)

        return this
    }

    contraGo() {
        this._currentState.forEach(state => {
            ContraActions[state].apply(this)
        })

        return this
    }

}

describe('Contra', function () {
    it('Case 1', function () {
        const littered = new Contra()
        littered.changeState(ContraEnumActions.Up,ContraEnumActions.Shoot)
            .contraGo()
    });
});













