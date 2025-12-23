const { countWord, countWordOnLine } = require('./index');

describe('countWord', () => {
    it('Example 1', () => {
        expect(
            countWord([
                'MMMSXXMASM',
                'MSAMXMSMSA',
                'AMXSXMAAMM',
                'MSAMASMSMX',
                'XMASAMXAMM',
                'XXAMMXXAMA',
                'SMSMSASXSS',
                'SAXAMASAAA',
                'MAMMMXMMMM',
                'MXMXAXMASX',
            ], 'XMAS', true)).toEqual(18);
    });
});

describe('countWordOnLine', () => {
    it('Example 1', () => {
        expect(countWordOnLine('MMMSXXMASM'.split(''), 'XMAS')).toEqual(2);
        expect(countWordOnLine('MSAMXMSMSA'.split(''), 'XMAS')).toEqual(0);
        expect(countWordOnLine('AMXSXMAAMM'.split(''), 'XMAS')).toEqual(0);
        expect(countWordOnLine('MSAMASMSMX'.split(''), 'XMAS')).toEqual(0);
        expect(countWordOnLine('XMASAMXAMM'.split(''), 'XMAS')).toEqual(1);
        expect(countWordOnLine('XXAMMXXAMA'.split(''), 'XMAS')).toEqual(0);
        expect(countWordOnLine('SMSMSASXSS'.split(''), 'XMAS')).toEqual(0);
        expect(countWordOnLine('SAXAMASAAA'.split(''), 'XMAS')).toEqual(1);
        expect(countWordOnLine('MAMMMXMMMM'.split(''), 'XMAS')).toEqual(0);
        expect(countWordOnLine('MXMXAXMASX'.split(''), 'XMAS')).toEqual(5);
        expect(countWordOnLine('MMMSXXMASM'.split(''), 'XMAS', true)).toEqual(1);
        expect(countWordOnLine('MSAMXMSMSA'.split(''), 'XMAS', true)).toEqual(0);
        expect(countWordOnLine('AMXSXMAAMM'.split(''), 'XMAS', true)).toEqual(0);
        expect(countWordOnLine('MSAMASMSMX'.split(''), 'XMAS', true)).toEqual(0);
        expect(countWordOnLine('XMASAMXAMM'.split(''), 'XMAS', true)).toEqual(1);
        expect(countWordOnLine('XXAMMXXAMA'.split(''), 'XMAS', true)).toEqual(0);
        expect(countWordOnLine('SMSMSASXSS'.split(''), 'XMAS', true)).toEqual(0);
        expect(countWordOnLine('SAXAMASAAA'.split(''), 'XMAS', true)).toEqual(0);
        expect(countWordOnLine('MAMMMXMMMM'.split(''), 'XMAS', true)).toEqual(0);
        expect(countWordOnLine('MXMXAXMASX'.split(''), 'XMAS', true)).toEqual(1);
    });
});
