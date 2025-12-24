const { getNbMoves } = require('./index');

describe('getNbMoves', () => {
    it('Example 1', () => {
        expect(
            getNbMoves([
                '....#.....',
                '.........#',
                '..........',
                '..#.......',
                '.......#..',
                '..........',
                '.#..^.....',
                '........#.',
                '#.........',
                '......#...',
            ])).toEqual(41);
    });
});
