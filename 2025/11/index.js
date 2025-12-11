const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const paths = input.split('\n').reduce((acc, pathStr) => {
    const [from, to] = pathStr.split(':');
    return {
        ...acc,
        [from]: to.trim().split(' '),
    };
}, {});

const getValidPathsFrom = {};

const getValidPaths = (paths, entry, exit) => {
    if (entry === exit) {
        return [[exit]];
    }
    const nodes = paths[entry];
    let validPaths = [];
    for (const node of nodes) {
        const validPathsFromNode = getValidPaths(paths, node, exit)
        validPaths.push(
            ...validPathsFromNode
            .map(p => [entry, ...p])
        );
    }
    return validPaths;
};

const getNumberOfValidPaths = (paths, entry, exit, mustGoThrough = []) => {
    const validPaths = getValidPaths(paths, entry, exit)
        .filter(p => mustGoThrough.every(mustGoThroughValue => p.includes(mustGoThroughValue)));
    return validPaths.length;
}

// Part 1
console.log(getNumberOfValidPaths(paths, 'you', 'out'));
// Part 2
// console.log(getNumberOfValidPaths(paths, 'svr', 'out', ['dac', 'fft']));

module.exports = {
    getNumberOfValidPaths,
};
