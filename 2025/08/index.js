const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n').map(row => row.split(',').map(Number));

const getDistance = (pt1, pt2) => {
    return Math.sqrt((pt1[0] - pt2[0]) ** 2 + (pt1[1] - pt2[1]) ** 2 + (pt1[2] - pt2[2]) ** 2);
}

const getDistances = (rows) => {
    const distances = new Map();
    for (let i = 0; i < rows.length; i++) {
        for (let j = i + 1; j < rows.length; j++) {
            const distance = getDistance(rows[i], rows[j]);
            distances.set([i, j], distance);
        }
    }
    return distances;
}

const makeCircuits = (distances, nbBoxes) => {
    const circuits = [];
    let lastConnection = null;

    for (const [[pt1, pt2], value] of distances) {
        const circuitPt1 = circuits.findIndex(circuit => circuit.has(pt1));
        const circuitPt2 = circuits.findIndex(circuit => circuit.has(pt2));
        
        if (circuitPt1 !== -1 && circuitPt2 !== -1) {
            if (circuitPt1 !== circuitPt2) {
                circuits[circuitPt1] = new Set([...circuits[circuitPt1], ...circuits[circuitPt2]]);
                circuits.splice(circuitPt2, 1);
            }
        } else if (circuitPt1 !== -1) {
            circuits[circuitPt1].add(pt2);
        } else if (circuitPt2 !== -1) {
            circuits[circuitPt2].add(pt1);
        } else {
            circuits.push(new Set([pt1, pt2]));
        }

        if (circuits.length === 1 && circuits[0].size === nbBoxes) {
            lastConnection = [pt1, pt2];
            break;
        }
    }
    return {
        circuits,
        lastConnection,
    };
}

const getSolution = (rows, nbConnections, nbCircuits) => {
    const distances = getDistances(rows);
    const sortedDistances = Array.from(distances.entries())
        .sort((a, b) => a[1] - b[1])
        .slice(0, nbConnections);
    const { circuits, lastConnection } = makeCircuits(sortedDistances, rows.length);
    
    const solution1 = circuits
        .sort((a, b) => b.size - a.size)
        .slice(0, nbCircuits)
        .reduce((acc, circuit) => acc * circuit.size, 1);

    const solution2 = lastConnection ? rows[lastConnection[0]][0] * rows[lastConnection[1]][0] : null;

    return {
        solution1,
        solution2,
    };
}

// Part 1
console.log(getSolution(rows, 1000, 3).solution1); // 1st try, N pts
// Part 2
console.log(getSolution(rows, 1000000, 1000).solution2); //

module.exports = {
    getSolution,
};
