const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const ranges = input.split(',').map(range => {
    return range.split('-').map(Number);
});

const isInvalid = (number) => {
    const numberStr = number.toString();
    if (numberStr.length % 2 !== 0) {
        return false;
    }
    const firstHalf = numberStr.slice(0, numberStr.length / 2)
    const secondHalf = numberStr.slice(numberStr.length / 2)
    return firstHalf === secondHalf;
};

const getInvalidNumbersForRange = (range) => {
    const invalidNumbers = [];
    const [start, end] = range;
    let current = start;
    while (current <= end) {
        if (isInvalid(current)) {
            invalidNumbers.push(current);
        }
        current++;
    }
    return invalidNumbers;
};

const getPassword = (ranges) => {
    const invalidNumbers = [];
    for (const range of ranges) {
        invalidNumbers.push(...getInvalidNumbersForRange(range));
    }
    return invalidNumbers.reduce((acc, number) => acc + number, 0);
}

console.log(getPassword(ranges)); // 1st try, 9 pts

module.exports = {
    getPassword,
    getInvalidNumbersForRange,
    isInvalid,
};
