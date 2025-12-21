const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const memory = input;

const getResult = (memory, considerDoInstructions = false) => {
    const re = considerDoInstructions
        ? /(?:do(?:n\'t)?\(\)|mul\((\d+),(\d+)\))/g
        : /mul\((\d+),(\d+)\)/g;
    let match;

    let result = 0;
    let doNotConsider = false;
    do {
        match = re.exec(memory);
        if (match) {
            if (match[0].startsWith('mul') && !doNotConsider) {
                result += Number(match[1]) * Number(match[2]);
            } else if (match[0] === 'do()') {
                doNotConsider = false;
            } else if (match[0] === "don't()") {
                doNotConsider = considerDoInstructions;
            }
        }
    } while (match);
    return result;
};

// Part 1
console.log(getResult(memory));
// Part 2
console.log(getResult(memory, true));

module.exports = {
    getResult,
};
