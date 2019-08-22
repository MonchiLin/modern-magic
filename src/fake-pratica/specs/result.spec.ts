import {Ok, Err} from '../src'

describe('Result', function () {
    const nameP = "杰克"
    const person = {name: nameP, age: 10}

    it('应该是 functor', function (done) {
        Ok.of(person)
            .map(p => p.name)
            .cata({
                Ok: name => expect(name).toBe(nameP),
                Err: done.fail
            })

        done()
    });

    it('应该是有 chain', function (done) {
        Ok.of(person)
            .map(p => p.name)
            .chain(name => name === nameP ? Ok.of(name) : Err.of('Name not jason'))
            .cata({
                Ok: name => expect(name).toBe(nameP),
                Err: done.fail
            })

        Ok.of(person)
            .map(p => p.name)
            .chain(name => name !== nameP ? Ok.of(name) : Err.of('Name is jason'))
            .cata({
                Ok: done.fail,
                Err: msg => expect(msg).toBe('Name is jason')
            })


        done()
    });

    it('应该有 ap', function (done) {
        const add = x => y => x + y
        const one = Ok.of((1))
        const two = Ok.of((2))

        // 成功
        Ok.of(add)
            .ap(one)
            .ap(two)
            .cata({
                Ok: x => expect(x).toBe(3),
                Err: done.fail
            })

        done()


    });

});
