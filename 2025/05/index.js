const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

const getFreshIngredients = (rows) => {
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

// Part 1
console.log(getFreshIngredients(rows)); // 1st try, 19 pts

module.exports = {
    getFreshIngredients,
};
