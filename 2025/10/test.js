const { getMinTotalNumberOfPushes } = require('./index');

describe('getSolution', () => {
    it('Example 1', () => {
        expect(
            getMinTotalNumberOfPushes(
                [
                    {
                        lights: [0, 1, 1, 0],
                        buttons: [[3],[1, 3], [2], [2, 3], [0, 2], [0, 1]],
                        joltage: [3, 5, 4, 7],
                    },
                ]
            )
        ).toEqual(2);
        expect(
            getMinTotalNumberOfPushes(
                [
                    {
                        lights: [0, 0, 0, 1, 0],
                        buttons: [[0, 2, 3, 4], [2, 3], [0, 4], [0, 1, 2], [1, 2, 3, 4]],
                        joltage: [7, 5, 12, 7, 2],
                    },
                ]
            )
        ).toEqual(3);
        // expect(
        //     getMinTotalNumberOfPushes(
        //         [
        //             {
        //                 lights: [1, 0, 0, 0, 1, 0],
        //                 buttons: [[0,1,2,3,4], [0,3,4], [0,1,2,4,5], [1,2]],
        //                 joltage: [10, 11, 11, 5, 10, 5],
        //             },
        //         ]
        //     )
        // ).toEqual(2);
    });
});
