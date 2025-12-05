const { getNbRolls } = require('./index');

describe('getNbRolls', () => {
    it('Example 1', () => {
        expect(getNbRolls([
            '..@@.@@@@.',
            '@@@.@.@.@@',
            '@@@@@.@.@@',
            '@.@@@@..@.',
            '@@.@@@@.@@',
            '.@@@@@@@.@',
            '.@.@.@.@@@',
            '@.@@@.@@@@',
            '.@@@@@@@@.',
            '@.@.@@@.@.',
        ])).toEqual(13);
    });
});
