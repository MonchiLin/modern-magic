const NavActions = {
    Show: "Show",
    Hide: "Hide",
}

const States = {
    [NavActions.Show]: function () {
        console.log("banner 展开了, 点击后关闭")
        // @ts-ignore
        this._currentState = NavActions.Hide
    },
    [NavActions.Hide]: function () {
        console.log("banner 展开了, 点击后关闭")
        // @ts-ignore
        this._currentState = NavActions.Show
    },
}

class Navigation {
    _currentState = NavActions.Hide

    toggle() {
        States[this._currentState].apply(this)
    }
}

describe("Navigation", () => {
    it('Case 1', function () {
        const navigation = new Navigation()
        navigation.toggle()
        expect(navigation._currentState).toBe(NavActions.Show)
    });
    it('Case 2', function () {
        const navigation = new Navigation()
        navigation.toggle()
        navigation.toggle()
        navigation.toggle()
        expect(navigation._currentState).toBe(NavActions.Show)
    });
})
