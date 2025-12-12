const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const paths = input.split('\n').reduce((acc, pathStr) => {
    const [from, to] = pathStr.split(':');
    return {
        ...acc,
        [from]: to.trim().split(' '),
    };
}, {});

const pathGoesThroughAllNodes = (path, mustGoThrough) => {
    return mustGoThrough.every(mustGoThroughValue => path.includes(mustGoThroughValue))
};

const getValidPaths = (paths, entry, exit, mustGoThrough, validPathsFrom, history = []) => {
    if (entry === exit) {
        return [[exit]];
    }
    const nodes = paths[entry];
    let validPaths = [];
    for (const node of nodes) {
        let validPathsFromNode;
        if (validPathsFrom[node]) {
            validPathsFromNode = validPathsFrom[node];
        } else {
            validPathsFromNode = getValidPaths(paths, node, exit, mustGoThrough, validPathsFrom, [...history, node]);
            validPathsFrom[node] = validPathsFromNode;
        }
        validPaths.push(
            ...validPathsFromNode
            .filter(p => {
                const set = new Set(p);
                return p.length === set.size;
            })
            .map(p => [entry, ...p])
        );
    }
    return validPaths;
};

const getNumberOfValidPaths = (paths, entry, exit, mustGoThrough = []) => {
    const validPathsFrom = {};
    const validPaths = getValidPaths(paths, entry, exit, mustGoThrough, validPathsFrom)
        .filter(p => pathGoesThroughAllNodes(p, mustGoThrough));
    return validPaths.length;
}

// Part 1
console.log(getNumberOfValidPaths(paths, 'you', 'out'));
// Part 2
// console.log(getNumberOfValidPaths(paths, 'svr', 'out', ['dac', 'fft']));

module.exports = {
    getNumberOfValidPaths,
};
