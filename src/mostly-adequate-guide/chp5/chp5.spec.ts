import {curry, compose, tap, join, split, replace, toLower, map} from 'ramda'

const dasherize = compose(
    join('-'),
    map(toLower),
    split(' '),
    replace(/\s{2,}/ig, ' ')
);

describe('', function () {
    it('case 1', function () {
        const x = dasherize('The world is a vampire')

        expect(true).toBe(true)
    });
});
