const { getResult } = require('./index');

describe('getNbSafeReports', () => {
    it('Example 1', () => {
        expect(getResult('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))')).toEqual(161);
    });
    it('Example 2', () => {
        expect(getResult("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))", true)).toEqual(48);
    });
});
