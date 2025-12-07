const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

const parseInput = (rows, cephalopod = false) => {
    const equations = [];
    if (cephalopod) {
        const splits = [];
        const chars = rows.map(row => row.split(''));
        for (let i = 0; i < chars[0].length; i++) {
            if (chars.every(char => char[i] === ' ')) {
                splits.push(i);
            }
        }
        for (let i = 0; i < splits.length; i++) {
            if (i === 0) {
                equations.push(rows.map(row => row.slice(0, splits[i])));
            } else {
                equations.push(rows.map(row => row.slice(splits[i - 1] + 1, splits[i])));
            }
            if (i === splits.length - 1) {
                equations.push(rows.map(row => row.slice(splits[i] + 1)));
            }
        }
    } else {
        const trimmedRows = rows.map(row => row.trim());
        const nbEquations = trimmedRows[0].split(/\s+/).length;
        for (let i = 0; i < nbEquations; i++) {
            equations.push(trimmedRows.map(row => row.split(/\s+/)[i]));
        }
    }
    return equations;
};

const evaluateEquation = (equation, cephalopod = false) => {
    let operator = equation[equation.length - 1].trim();
    let operands = equation.slice(0, -1);
    const initialValue = operator === '+' ? 0 : 1;
    if (cephalopod) {
        const newOperands = []
        for (let i = 0; i < operands[0].toString().length; i++) {
            newOperands.push(parseInt(operands.map(operand => operand.toString()[i]).join('')));
        }
        operands = newOperands;
    }
    return operands.reduce((acc, operand) => {
        if (operator === '+') {
            return acc + parseInt(operand);
        } else if (operator === '*') {
            return acc * parseInt(operand);
        }
        throw new Error('Invalid operator');
    }, initialValue);
}

const getResult = (rows, cephalopod = false) => {
    const equations = parseInput(rows, cephalopod);
    let totalResult = 0;
    for (const equation of equations) {
        totalResult += evaluateEquation(equation, cephalopod);
    }
    return totalResult;
}

// Part 1
console.log(getResult(rows)); // 1st try, 19 pts
// Part 2
console.log(getResult(rows, true)); // 1st try, 19 pts

module.exports = {
    getResult,
    evaluateEquation,
    parseInput,
};
