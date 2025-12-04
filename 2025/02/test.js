const { getPassword, getInvalidNumbersForRange, isInvalid } = require('./index');

describe('isInvalid', () => {
    it('Example 1', () => {
        expect(isInvalid(11)).toEqual(true);
        expect(isInvalid(22)).toEqual(true);
        expect(isInvalid(101)).toEqual(false);
    });
});

describe('getInvalidNumbersForRange', () => {
    it('Example 1', () => {
        expect(getInvalidNumbersForRange([11, 22])).toEqual([11, 22]);
        expect(getInvalidNumbersForRange([95, 115])).toEqual([99]);
        expect(getInvalidNumbersForRange([998, 1012])).toEqual([1010]);
        expect(getInvalidNumbersForRange([1188511880, 1188511890])).toEqual([1188511885]);
        expect(getInvalidNumbersForRange([222220, 222224])).toEqual([222222]);
        expect(getInvalidNumbersForRange([1698522, 1698528])).toEqual([]);
        expect(getInvalidNumbersForRange([446443, 446449])).toEqual([446446]);
        expect(getInvalidNumbersForRange([38593856, 38593862])).toEqual([38593859]);
        expect(getInvalidNumbersForRange([565653, 565659])).toEqual([]);
        expect(getInvalidNumbersForRange([824824821, 824824827])).toEqual([]);
    });
    it('Example 2', () => {
        expect(getInvalidNumbersForRange([11, 22], true)).toEqual([11, 22]);
        expect(getInvalidNumbersForRange([95, 115], true)).toEqual([99, 111]);
        expect(getInvalidNumbersForRange([998, 1012], true)).toEqual([999, 1010]);
        expect(getInvalidNumbersForRange([1188511880, 1188511890], true)).toEqual([1188511885]);
        expect(getInvalidNumbersForRange([222220, 222224], true)).toEqual([222222]);
        expect(getInvalidNumbersForRange([1698522, 1698528], true)).toEqual([]);
        expect(getInvalidNumbersForRange([446443, 446449], true)).toEqual([446446]);
        expect(getInvalidNumbersForRange([38593856, 38593862], true)).toEqual([38593859]);
        expect(getInvalidNumbersForRange([565653, 565659], true)).toEqual([565656]);
        expect(getInvalidNumbersForRange([824824821, 824824827], true)).toEqual([824824824]);
        expect(getInvalidNumbersForRange([2121212118, 2121212124], true)).toEqual([2121212121]);
    });
});

describe('getPassword', () => {
    it('Example 1', () => {
        expect(getPassword([[11, 22]])).toBe(33);
        expect(getPassword([[11, 22], [95, 115], [998, 1012], [1188511880, 1188511890], [222220, 222224], [1698522, 1698528], [446443, 446449], [38593856, 38593862], [565653, 565659], [824824821, 824824827]])).toBe(1227775554);
    });
    it('Example 2', () => {
        expect(getPassword([[11, 22], [95, 115], [998, 1012], [1188511880, 1188511890], [222220, 222224], [1698522, 1698528], [446443, 446449], [38593856, 38593862], [565653, 565659], [824824821, 824824827], [2121212118, 2121212124]], true)).toBe(4174379265);
    });
});
