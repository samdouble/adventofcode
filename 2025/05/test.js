const { getFreshIngredients } = require('./index');

describe('getFreshIngredients', () => {
    it('Example 1', () => {
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
        ])).toEqual(3);
    });
});
