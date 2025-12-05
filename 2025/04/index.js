const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

const replaceAt = (str, index, char) => {
    return str.slice(0, index) + char + str.slice(index + 1);
};

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

const getAccessibleRolls = (rows) => {
    const accessibleRolls = [];
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === '@') {
                const adjacentPositions = getAdjacentPositions(i, j, rows.length, rows[i].length);
                const nbAdjacentRolls = adjacentPositions.filter(([x, y]) => rows[x][y] === '@').length;
                if (nbAdjacentRolls < 4) {
                    accessibleRolls.push([i, j]);
                }
            }
        }
    }
    return accessibleRolls;
}

const getNbRolls = (rows, keepRepeating = false) => {
    let accessibleRolls = getAccessibleRolls(rows);
    let nbAccessibleRolls = accessibleRolls.length;
    const newRows = [...rows];
    while (keepRepeating) {
        for (const [i, j] of accessibleRolls) {
            newRows[i] = replaceAt(newRows[i], j, '.');
        }

        accessibleRolls = getAccessibleRolls(newRows);
        if (accessibleRolls.length === 0) {
            break;
        }
        nbAccessibleRolls += accessibleRolls.length;
    }
    return nbAccessibleRolls;
}

// Part 1
console.log(getNbRolls(rows)); // 1st try, 16 pts
// Part 2
console.log(getNbRolls(rows, true)); // 1st try, 16 pts

module.exports = {
    getNbRolls,
};
