const { parseInput, evaluateEquation } = require('./index');

describe('evaluateEquation', () => {
    it('Example 1', () => {
        expect(evaluateEquation(['123', '45', '6', '*'])).toEqual(33210);
        expect(evaluateEquation(['328', '64', '98', '+'])).toEqual(490);
        expect(evaluateEquation(['51', '387', '215', '*'])).toEqual(4243455);
        expect(evaluateEquation(['64', '23', '314', '+'])).toEqual(401);
    });
    it('Example 2', () => {
        expect(evaluateEquation(['123', ' 45', '  6', '*  '], true)).toEqual(8544);
        expect(evaluateEquation(['328', '64 ', '98 ', '+  '], true)).toEqual(625);
        expect(evaluateEquation([' 51', '387', '215', '*  '], true)).toEqual(3253600);
        expect(evaluateEquation(['64 ', '23 ', '314', '+  '], true)).toEqual(1058);
    });
});

describe('parseInput', () => {
    it('Example 2', () => {
        expect(parseInput(['123 328  51 64 ', ' 45 64  387 23 ', '  6 98  215 314', '*   +   *   +  '], true)).toEqual([
            ['123', ' 45', '  6', '*  '],
            ['328', '64 ', '98 ', '+  '],
            [' 51', '387', '215', '*  '],
            ['64 ', '23 ', '314', '+  '],
        ]);
    });
});
