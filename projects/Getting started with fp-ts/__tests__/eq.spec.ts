import { elem, eqNumber } from "../eq";

describe('elem', function () {
  it('eqNumber', function () {
    const elemNumber = elem(eqNumber)
    expect(elemNumber(1, [1, 2, 3, 4])).toStrictEqual(true)
  });

});
