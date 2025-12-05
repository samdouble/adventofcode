const { getFreshAvailableIngredients, getFreshIngredients } = require('./index');

describe('getFreshAvailableIngredients', () => {
    it('Example 1', () => {
        expect(getFreshAvailableIngredients([
            '3-5',
            '10-14',
            '16-20',
            '12-18',
            '',
            '1',
            '5',
            '8',
            '11',
            '17',
            '32',
        ])).toEqual(3);
    });
    it('Example 2', () => {
        expect(getFreshIngredients([
            '3-5',
            '10-14',
            '16-20',
            '12-18',
            '',
            '1',
            '5',
            '8',
            '11',
            '17',
            '32',
        ])).toEqual(14);
    });
});
