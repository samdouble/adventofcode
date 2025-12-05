const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

const getAdjacentPositions = (i, j, nbRows, nbCols) => {
    return [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1],
    ].filter(([x, y]) => x >= 0 && x < nbRows && y >= 0 && y < nbCols);
};

const getNbRolls = (rows) => {
    let nbAccessibleRolls = 0;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === '@') {
                const adjacentPositions = getAdjacentPositions(i, j, rows.length, rows[i].length);
                const nbAdjacentRolls = adjacentPositions.filter(([x, y]) => rows[x][y] === '@').length;
                if (nbAdjacentRolls < 4) {
                    nbAccessibleRolls++;
                }
            }
        }
    }
    return nbAccessibleRolls;
}

// Part 1
console.log(getNbRolls(rows)); // 1st try, 16 pts

module.exports = {
    getNbRolls,
};
