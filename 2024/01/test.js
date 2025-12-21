const { getTotalDistance } = require('./index');

describe('getTotalDistance', () => {
    it('Example 1', () => {
        expect(getTotalDistance(
            [3, 4, 2, 1, 3, 3],
            [4, 3, 5, 3, 9, 3],
        )).toEqual(11);
    });
});
