const { getPassword, getMaxJoltage } = require('./index');

describe('getMaxJoltage', () => {
    it('Example 1', () => {
        expect(getMaxJoltage('987654321111111', 2)).toEqual([9, 8]);
        expect(getMaxJoltage('811111111111119', 2)).toEqual([8, 9]);
        expect(getMaxJoltage('234234234234278', 2)).toEqual([7, 8]);
        expect(getMaxJoltage('818181911112111', 2)).toEqual([9, 2]);
    });
});
