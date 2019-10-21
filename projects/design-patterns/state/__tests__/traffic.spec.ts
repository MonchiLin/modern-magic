enum LightActions {
    Red,
    Green,
    Yellow,
}

const LightStates = {
    [LightActions.Red]: function () {
        console.log("红灯转换到绿灯")
    },
    [LightActions.Green]: function () {
        console.log("绿灯转换到黄灯")
    },
    [LightActions.Yellow]: function () {
        console.log("黄灯转换到红灯")
    },
};

class Traffic {
    _currentState = LightActions.Red;

    change(light: LightActions) {
        this._currentState = light;
        LightStates[light].apply(this)
    }

}

describe("Traffic", () => {
    it('Case 1', () => {
        const traffic =  new Traffic();
        traffic.change(LightActions.Red);
        traffic.change(LightActions.Green)
    });
});
