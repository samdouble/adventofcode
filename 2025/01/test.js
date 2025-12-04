const { getPassword, rotate } = require('./index');

describe('rotate', () => {
    it('should rotate correctly for given direction and distance', () => {
        expect(rotate(50, 'R', 68)).toBe(18);
        expect(rotate(50, 'L', 30)).toBe(20);
        expect(rotate(50, 'R', 48)).toBe(98);
    });
});

describe('getPassword', () => {
    it('Example 1', () => {
        const lines = [
            'L68',
            'L30',
            'R48',
            'L5',
            'R60',
            'L55',
            'L1',
            'L99',
            'R14',
            'L82',
        ];

        const result = getPassword(lines);
        expect(result).toBe(3);
    });
});
