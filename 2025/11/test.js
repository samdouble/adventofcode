const { getNumberOfValidPaths } = require('./index');

describe('getSolution', () => {
    it('Example 1', () => {
        expect(
            getNumberOfValidPaths({
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
    it('Example 2', () => {
        expect(
            getNumberOfValidPaths({
                svr: ['aaa', 'bbb'],
                aaa: ['fft'],
                fft: ['ccc'],
                bbb: ['tty'],
                tty: ['ccc'],
                ccc: ['ddd', 'eee'],
                ddd: ['hub'],
                hub: ['fff'],
                eee: ['dac'],
                dac: ['fff'],
                fff: ['ggg', 'hhh'],
                ggg: ['out'],
                hhh: ['out'],
            }, 'svr', 'out', ['fft', 'dac'])
        ).toEqual(2);
    });
});
