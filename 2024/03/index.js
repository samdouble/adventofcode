const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const memory = input;

const getResult = (memory) => {
    const re = /mul\((\d+),(\d+)\)/g;
    let match;

    let result = 0;
    do {
        match = re.exec(memory);
        if (match) {
            result += Number(match[1]) * Number(match[2]);
        }
    } while (match);
    return result;
};

// Part 1
console.log(getResult(memory));

module.exports = {
    getResult,
};
