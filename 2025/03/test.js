const { getPassword, getMaxJoltage } = require('./index');

describe('getMaxJoltage', () => {
    it('Example 1', () => {
        expect(getMaxJoltage('987654321111111')).toEqual(98);
        expect(getMaxJoltage('811111111111119')).toEqual(89);
        expect(getMaxJoltage('234234234234278')).toEqual(78);
        expect(getMaxJoltage('818181911112111')).toEqual(92);
    });
});
