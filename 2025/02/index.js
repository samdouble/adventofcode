const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const ranges = input.split(',').map(range => {
    return range.split('-').map(Number);
});

const isRepeatedMultipleTimes = (number, rest) => {
    if (rest.length === 0 || rest.length < number.length) {
        return false;
    }
    if (rest.length === number.length) {
        return rest === number;
    }
    if (rest.slice(0, number.length) === number) {
        return isRepeatedMultipleTimes(number, rest.slice(number.length));
    }
    return false;
};

const isInvalid = (number, onlyRepeatedMultipleTimes = false) => {
    const numberStr = number.toString();
    if (onlyRepeatedMultipleTimes) {
        const startChar = 0;
        for (let length = 1; length <= Math.ceil(numberStr.length / 2) - startChar; length++) {
            if (isRepeatedMultipleTimes(numberStr.slice(startChar, startChar + length), numberStr.slice(startChar + length))) {
                return true;
            }
        }
    }
    if (numberStr.length % 2 !== 0) {
        return false;
    }
    const firstHalf = numberStr.slice(0, numberStr.length / 2)
    const secondHalf = numberStr.slice(numberStr.length / 2)
    return firstHalf === secondHalf;
};

const getInvalidNumbersForRange = (range, onlyRepeatedMultipleTimes = false) => {
    const invalidNumbers = [];
    const [start, end] = range;
    let current = start;
    while (current <= end) {
        if (isInvalid(current, onlyRepeatedMultipleTimes)) {
            invalidNumbers.push(current);
        }
        current++;
    }
    return invalidNumbers;
};

const getPassword = (ranges, onlyRepeatedMultipleTimes = false) => {
    const invalidNumbers = [];
    for (const range of ranges) {
        invalidNumbers.push(...getInvalidNumbersForRange(range, onlyRepeatedMultipleTimes));
    }
    return invalidNumbers.reduce((acc, number) => acc + number, 0);
}

console.log(getPassword(ranges)); // 1st try, 9 pts
console.log(getPassword(ranges, true)); // 1st try, 18 pts

module.exports = {
    getPassword,
    getInvalidNumbersForRange,
    isInvalid,
};
