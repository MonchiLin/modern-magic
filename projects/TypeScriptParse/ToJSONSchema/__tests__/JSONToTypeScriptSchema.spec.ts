import {compile, compileFromFile} from '@magic/json-schema-to-typescript'

describe('JSONToTypeScriptSchema', function () {

    it('should parse Object', (done) => {

        return compile({Foo: "Bar"}, "Foo")
            .then(res => {
                debugger
            })


    });

});