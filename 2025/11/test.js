const { getNumberOfPaths } = require('./index');

describe('getSolution', () => {
    it('Example 1', () => {
        expect(
            getNumberOfPaths({
                aaa: ['you', 'hhh'],
                you: ['bbb', 'ccc'],
                bbb: ['ddd', 'eee'],
                ccc: ['ddd', 'eee', 'fff'],
                ddd: ['ggg'],
                eee: ['out'],
                fff: ['out'],
                ggg: ['out'],
                hhh: ['ccc', 'fff', 'iii'],
                iii: ['out'],
            }, 'you', 'out')
        ).toEqual(5);
    });
});
