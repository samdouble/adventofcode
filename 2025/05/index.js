const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

const parseInput = (rows) => {
    const ingredientRanges = [];
    const availableIngredients = [];
    let addToIngredientRanges = true;
    for (const row of rows) {
        if (row === '') {
            addToIngredientRanges = false;
            continue;
        }
        if (addToIngredientRanges) {
            ingredientRanges.push(row.split('-').map(Number));
        } else {
            availableIngredients.push(Number(row));
        }
    }
    return {
        ingredientRanges,
        availableIngredients,
    };
};

const getFreshAvailableIngredients = (rows) => {
    const { ingredientRanges, availableIngredients } = parseInput(rows);
    let nbFreshIngredients = 0;
    for (const availableIngredient of availableIngredients) {
        for (const ingredientRange of ingredientRanges) {
            if (availableIngredient >= ingredientRange[0] && availableIngredient <= ingredientRange[1]) {
                nbFreshIngredients++;
                break;
            }
        }
    }
    return nbFreshIngredients;
}

const getFreshIngredients = (rows) => {
    const { ingredientRanges } = parseInput(rows);
    const sortedIngredientRanges = ingredientRanges.sort((a, b) => a[0] - b[0]);
    const uniqueRanges = [sortedIngredientRanges[0]];
    for (const ingredientRange of sortedIngredientRanges.slice(1)) {
        if (ingredientRange[0] > uniqueRanges[uniqueRanges.length - 1][1]) {
            uniqueRanges.push(ingredientRange);
        } else {
            uniqueRanges[uniqueRanges.length - 1][1] = Math.max(uniqueRanges[uniqueRanges.length - 1][1], ingredientRange[1]);
        }
    }
    return uniqueRanges.reduce((acc, range) => acc + (range[1] - range[0] + 1), 0);
}

// Part 1
console.log(getFreshAvailableIngredients(rows)); // 1st try, 19 pts
// Part 2
console.log(getFreshIngredients(rows)); // 1st try, 19 pts

module.exports = {
    getFreshAvailableIngredients,
    getFreshIngredients,
};
