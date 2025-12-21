const { getPassword, rotate } = require('./index');

describe('rotate', () => {
    it('Example 1', () => {
        expect(rotate(50, 'R', 68)).toEqual({ newPos: 18, nbClickedOn0: 1 });
        expect(rotate(50, 'L', 30)).toEqual({ newPos: 20, nbClickedOn0: 0 });
        expect(rotate(50, 'R', 48)).toEqual({ newPos: 98, nbClickedOn0: 0 });
        expect(rotate(50, 'L', 100)).toEqual({ newPos: 50, nbClickedOn0: 1 });
        expect(rotate(50, 'L', 200)).toEqual({ newPos: 50, nbClickedOn0: 2 });
        expect(rotate(50, 'R', 1000)).toEqual({ newPos: 50, nbClickedOn0: 10 });
        expect(rotate(50, 'R', 149)).toEqual({ newPos: 99, nbClickedOn0: 1 });
        expect(rotate(50, 'R', 150)).toEqual({ newPos: 0, nbClickedOn0: 2 });
        expect(rotate(50, 'R', 151)).toEqual({ newPos: 1, nbClickedOn0: 2 });
        expect(rotate(50, 'L', 149)).toEqual({ newPos: 1, nbClickedOn0: 1 });
        expect(rotate(50, 'L', 150)).toEqual({ newPos: 0, nbClickedOn0: 2 });
        expect(rotate(50, 'L', 151)).toEqual({ newPos: 99, nbClickedOn0: 2 });
    });
    it('Example 2', () => {
        expect(rotate(50, 'L', 68)).toEqual({ newPos: 82, nbClickedOn0: 1 });
        expect(rotate(82, 'L', 30)).toEqual({ newPos: 52, nbClickedOn0: 0 });
        expect(rotate(52, 'R', 48)).toEqual({ newPos: 0, nbClickedOn0: 1 });
        expect(rotate(0, 'L', 5)).toEqual({ newPos: 95, nbClickedOn0: 0 });
        expect(rotate(95, 'R', 60)).toEqual({ newPos: 55, nbClickedOn0: 1 });
        expect(rotate(55, 'L', 55)).toEqual({ newPos: 0, nbClickedOn0: 1 });
        expect(rotate(0, 'L', 1)).toEqual({ newPos: 99, nbClickedOn0: 0 });
        expect(rotate(99, 'L', 99)).toEqual({ newPos: 0, nbClickedOn0: 1 });
        expect(rotate(0, 'R', 14)).toEqual({ newPos: 14, nbClickedOn0: 0 });
        expect(rotate(14, 'L', 82)).toEqual({ newPos: 32, nbClickedOn0: 1 });
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

    it('Example 2', () => {
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

        const result = getPassword(lines, true);
        expect(result).toBe(6);
    });
});
