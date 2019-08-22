import {always} from "./utils";

export const oks = (arr = []) => arr.filter(a => a.isOk && a.isOk())
const isProperCata = obj => obj.Ok && obj.Err
const improperCata = () => {
    throw new Error('Cata missing Ok or Err')
}

class Ok {

    constructor(private _value) {
    }


    static of(value) {
        return new Ok(value)
    }

    ap(value: Ok) {
        return value.map(this._value)
    }

    map(cb) {
        return Ok.of(cb(this._value))
    }

    cata(obj) {
        return isProperCata(obj)
            ? obj.Ok(this._value)
            : improperCata()
    }

    chain(cb: Function) {
        return cb(this._value)
    }
}

class Err {

    constructor(private _value) {

    }


    static of(value) {
        return new Err(value)
    }

    cata(obj) {
        return isProperCata(obj)
            ? obj.Err(this._value)
            : improperCata()
    }

}

export {
    Ok,
    Err
}