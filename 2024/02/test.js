const { getNbSafeReports, isReportSafe } = require('./index');

describe('getNbSafeReports', () => {
    it('Example 1', () => {
        expect(getNbSafeReports([
            [7, 6, 4, 2, 1],
            [1, 2, 7, 8, 9],
            [9, 7, 6, 2, 1],
            [1, 3, 2, 4, 5],
            [8, 6, 4, 4, 1],
            [1, 3, 6, 7, 9],
        ])).toEqual(2);
    });
    it('Example 2', () => {
        expect(getNbSafeReports([
            [7, 6, 4, 2, 1],
            [1, 2, 7, 8, 9],
            [9, 7, 6, 2, 1],
            [1, 3, 2, 4, 5],
            [8, 6, 4, 4, 1],
            [1, 3, 6, 7, 9],
        ], true)).toEqual(4);
    });
});

describe('isReportSafe', () => {
    it('Example 1', () => {
        expect(isReportSafe([7, 6, 4, 2, 1])).toEqual(true);
        expect(isReportSafe([1, 2, 7, 8, 9])).toEqual(false);
        expect(isReportSafe([9, 7, 6, 2, 1])).toEqual(false);
        expect(isReportSafe([1, 3, 2, 4, 5])).toEqual(false);
        expect(isReportSafe([8, 6, 4, 4, 1])).toEqual(false);
        expect(isReportSafe([1, 3, 6, 7, 9])).toEqual(true);
    });
    it('Example 2', () => {
        expect(isReportSafe([7, 6, 4, 2, 1], true)).toEqual(true);
        expect(isReportSafe([1, 2, 7, 8, 9], true)).toEqual(false);
        expect(isReportSafe([9, 7, 6, 2, 1], true)).toEqual(false);
        expect(isReportSafe([1, 3, 2, 4, 5], true)).toEqual(true);
        expect(isReportSafe([8, 6, 4, 4, 1], true)).toEqual(true);
        expect(isReportSafe([1, 3, 6, 7, 9], true)).toEqual(true);
    });
});
