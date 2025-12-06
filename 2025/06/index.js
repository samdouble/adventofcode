const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

const parseInput = (rows) => {
    const equations = [];
    const nbEquations = rows[0].split(/\s+/).length;
    for (let i = 0; i < nbEquations; i++) {
        equations.push(rows.map(row => row.split(/\s+/)[i]));
    }
    return equations;
};

const evaluateEquation = (equation) => {
    let operator = equation[equation.length - 1];
    let operands = equation.slice(0, -1).map(operand => parseInt(operand));
    const initialValue = operator === '+' ? 0 : 1;
    return operands.reduce((acc, operand) => {
        if (operator === '+') {
            return acc + operand;
        } else if (operator === '*') {
            return acc * operand;
        }
        throw new Error('Invalid operator');
    }, initialValue);
}

const getResult = (rows) => {
    const equations = parseInput(rows);
    let totalResult = 0;
    for (const equation of equations) {
        totalResult += evaluateEquation(equation);
    }
    return totalResult;
}

// Part 1
console.log(getResult(rows)); // 1st try, 19 pts

module.exports = {
    getResult,
    evaluateEquation
};
