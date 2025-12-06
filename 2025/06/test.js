const { getResult, evaluateEquation } = require('./index');

describe('evaluateEquation', () => {
    it('Example 1', () => {
        expect(evaluateEquation(['123', '45', '6', '*'])).toEqual(33210);
        expect(evaluateEquation(['328', '64', '98', '+'])).toEqual(490);
        expect(evaluateEquation(['51', '387', '215', '*'])).toEqual(4243455);
        expect(evaluateEquation(['64', '23', '314', '+'])).toEqual(401);
    });
});
