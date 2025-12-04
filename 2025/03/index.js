const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const banks = input.split('\n');

const getMaxJoltage = (bank) => {
    const bankNumbers = bank.split('').map(Number);
    let first = 0;
    let second = 0;
    for (let i = 0; i < bankNumbers.length - 1; i++) {
        if (bankNumbers[i] > first) {
            first = bankNumbers[i];
            second = Math.max(...bankNumbers.slice(i + 1));
        }
    }
    return parseInt([first, second].join(''));
}

const getPassword = (banks) => {
    let joltage = 0;
    for (const bank of banks) {
        joltage += getMaxJoltage(bank);
    }
    return joltage;
}

console.log(getPassword(banks)); // 1st try, 9 pts

module.exports = {
    getPassword,
    getMaxJoltage,
};
