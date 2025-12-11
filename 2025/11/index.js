const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const paths = input.split('\n').reduce((acc, pathStr) => {
    const [from, to] = pathStr.split(':');
    return {
        ...acc,
        [from]: to.trim().split(' '),
    };
}, {});

const getNumberOfPaths = (paths, entry, exit) => {
    if (entry === exit) {
        return 1;
    }
    const nodes = paths[entry];
    let numberOfPaths = 0;
    for (const node of nodes) {
        numberOfPaths += getNumberOfPaths(paths, node, exit);
    }
    return numberOfPaths;
};

// Part 1
console.log(getNumberOfPaths(paths, 'you', 'out')); // 1st try, N points

module.exports = {
    getNumberOfPaths,
};
