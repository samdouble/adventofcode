const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const redTiles = input.split('\n').map(row => row.split(',').map(Number));

const getRectangleArea = (rectangle) => {
    return (Math.abs(rectangle[0][0] - rectangle[1][0]) + 1) * (Math.abs(rectangle[0][1] - rectangle[1][1]) + 1);
}

const isPointInsidePath = (pt, path) => {
    let linesAtLeft = path.filter(line => (
        line[0][0] === line[1][0]
        && ((line[0][1] <= pt[1] && line[1][1] >= pt[1]) || (line[0][1] >= pt[1] && line[1][1] <= pt[1]))
        && line[0][0] <= pt[0]
    )).sort((a, b) => a[0][0] - b[0][0]);
    let linesAtRight = path.filter(line => (
        line[0][0] === line[1][0]
        && ((line[0][1] <= pt[1] && line[1][1] >= pt[1]) || (line[0][1] >= pt[1] && line[1][1] <= pt[1]))
        && line[0][0] >= pt[0]
    )).sort((a, b) => a[0][0] - b[0][0]);
    let linesAtTop = path.filter(line => (
        line[0][1] === line[1][1]
        && ((line[0][0] <= pt[0] && line[1][0] >= pt[0]) || (line[0][0] >= pt[0] && line[1][0] <= pt[0]))
        && line[0][1] <= pt[1]
    )).sort((a, b) => a[0][1] - b[0][1]);
    let linesAtBottom = path.filter(line => (
        line[0][1] === line[1][1]
        && ((line[0][0] <= pt[0] && line[1][0] >= pt[0]) || (line[0][0] >= pt[0] && line[1][0] <= pt[0]))
        && line[0][1] >= pt[1]
    )).sort((a, b) => a[0][1] - b[0][1]);

    // Remove duplicate lines in case of having multiple lines at the same x or y
    if (linesAtLeft.length > linesAtRight.length) {
        linesAtLeft = linesAtLeft.filter(line => (
            !linesAtRight.some(l => l[0][0] === line[0][0] && l[0][1] === line[0][1])
        ));
    }
    if (linesAtRight.length > linesAtLeft.length) {
        linesAtRight = linesAtRight.filter(line => (
            !linesAtLeft.some(l => l[0][0] === line[0][0] && l[0][1] === line[0][1])
        ));
    }
    if (linesAtTop.length > linesAtBottom.length) {
        linesAtTop = linesAtTop.filter(line => (
            !linesAtBottom.some(l => l[0][0] === line[0][0] && l[0][1] === line[0][1])
        ));
    }
    if (linesAtBottom.length > linesAtTop.length) {
        linesAtBottom = linesAtBottom.filter(line => (
            !linesAtTop.some(l => l[0][0] === line[0][0] && l[0][1] === line[0][1])
        ));
    }
    return (
        linesAtLeft.length
        && linesAtRight.length
        && linesAtTop.length
        && linesAtBottom.length
    );
}

const getAllPointsOnSideOfRectangle = (rectangle) => {
    const NWpoint = [Math.min(rectangle[0][0], rectangle[1][0]), Math.min(rectangle[0][1], rectangle[1][1])];
    const NEpoint = [Math.max(rectangle[0][0], rectangle[1][0]), Math.min(rectangle[0][1], rectangle[1][1])];
    const SWpoint = [Math.min(rectangle[0][0], rectangle[1][0]), Math.max(rectangle[0][1], rectangle[1][1])];
    const SEpoint = [Math.max(rectangle[0][0], rectangle[1][0]), Math.max(rectangle[0][1], rectangle[1][1])];
    const allPointsOnSide = [];
    for (let i = NWpoint[0]; i <= NEpoint[0]; i++) {
        allPointsOnSide.push([i, NWpoint[1]]);
    }
    for (let i = NEpoint[1]; i <= SEpoint[1]; i++) {
        allPointsOnSide.push([NEpoint[0], i]);
    }
    for (let i = SEpoint[0]; i >= SWpoint[0]; i--) {
        allPointsOnSide.push([i, SEpoint[1]]);
    }
    for (let i = SWpoint[1]; i >= NWpoint[1]; i--) {
        allPointsOnSide.push([SWpoint[0], i]);
    }
    return allPointsOnSide;
}

const getLargestRectangleArea = (redTiles, redAndGreen = false) => {
    let largestArea = 351098397;
    if (redAndGreen) {
        const path = [];
        for (let i = 0; i < redTiles.length; i++) {
            if (i === redTiles.length - 1) {
                path.push([redTiles[i], redTiles[0]]);
            } else {
                path.push([redTiles[i], redTiles[i + 1]]);
            }
        }
        for (let i = 100; i < 200; i++) {
            for (let j = i + 1; j < redTiles.length; j++) {
                console.log(i, j, largestArea);
                // Optimization
                if (getRectangleArea([redTiles[i], redTiles[j]]) <= largestArea) {
                    continue;
                }
                const allPointsOnSideOfRectangle = getAllPointsOnSideOfRectangle([redTiles[i], redTiles[j]]);
                const allPointsAreInsidePath = allPointsOnSideOfRectangle.every(point => isPointInsidePath(point, path));
                if (allPointsAreInsidePath) {
                    const area = getRectangleArea([redTiles[i], redTiles[j]]);
                    if (area > largestArea) {
                        largestArea = area;
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < redTiles.length; i++) {
            for (let j = i + 1; j < redTiles.length; j++) {
                const area = getRectangleArea([redTiles[i], redTiles[j]]);
                if (area > largestArea) {
                    largestArea = area;
                }
            }
        }
    }
    return largestArea;
}

// Part 1
console.log(getLargestRectangleArea(redTiles)); // 1st try, N - 1 pts
// // Part 2
console.log(getLargestRectangleArea(redTiles, true)); // Tried 4618517036

module.exports = {
    getLargestRectangleArea,
};
