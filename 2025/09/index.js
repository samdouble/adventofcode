const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const redTiles = input.split('\n').map(row => row.split(',').map(Number));

const pointExists = (pt, pts) => {
    return pts.some(p => p[0] === pt[0] && p[1] === pt[1]);
}

const getBiggestRectangleFromTile = (tile, pts) => {
    let ptsSameRow = pts.filter(pt => pt[1] === tile[1] && tile[0] <= pt[0]).sort((a, b) => b[0] - a[0]);
    let ptsSameCol = pts.filter(pt => pt[0] === tile[0] && tile[1] <= pt[1]).sort((a, b) => b[1] - a[1]);

    let largestArea = 0;
    for (const ptSameRow of ptsSameRow) {
        for (const ptSameCol of ptsSameCol) {
            console.log(ptSameRow, ptSameCol);
            console.log(pointExists([ptSameRow[0], ptSameCol[1]], pts));
            if (pointExists([ptSameRow[0], ptSameCol[1]], pts)) {
                area = (Math.abs(ptSameRow[0] - ptSameCol[0]) + 1) * (Math.abs(ptSameRow[1] - ptSameCol[1]) + 1);
                console.log(area);
                if (area > largestArea) {
                    largestArea = area;
                }
            }
        }
    }
    return largestArea;
}

const getLargestRectangleArea = (redTiles) => {
    let largestArea = 0;
    for (let i = 0; i < redTiles.length; i++) {
        for (let j = i + 1; j < redTiles.length; j++) {
            const area = (Math.abs(redTiles[i][0] - redTiles[j][0]) + 1) * (Math.abs(redTiles[i][1] - redTiles[j][1]) + 1);
            if (area > largestArea) {
                largestArea = area;
            }
        }
    }
    return largestArea;
}

// Part 1
console.log(getLargestRectangleArea(redTiles)); //

module.exports = {
    getLargestRectangleArea,
};
