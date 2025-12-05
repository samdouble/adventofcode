const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const banks = input.split('\n');

const getMaxJoltage = (bank, nbInEachBank) => {
    if (nbInEachBank === 0) {
        return [];
    }
    const bankNumbers = bank.split('').map(Number);
    let joltage = new Array(nbInEachBank).fill(0);
    for (let i = 0; i < bankNumbers.length - nbInEachBank + 1; i++) {
        if (bankNumbers[i] > joltage[0]) {
            joltage = [
                bankNumbers[i],
                ...getMaxJoltage(bankNumbers.slice(i + 1).join(''), nbInEachBank - 1),
            ]
        }
    }
    return joltage;
}

const getPassword = (banks, nbInEachBank) => {
    let joltage = 0;
    for (const bank of banks) {
        const bankJoltage = parseInt(getMaxJoltage(bank, nbInEachBank).join(''));
        joltage += bankJoltage;
    }
    return joltage;
}

// Part 1
console.log(getPassword(banks, 2)); // 1st try, 9 pts
// Part 2
console.log(getPassword(banks, 12)); // 1st try, 14 pts

module.exports = {
    getPassword,
    getMaxJoltage,
};
