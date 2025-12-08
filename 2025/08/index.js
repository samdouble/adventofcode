const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n').map(row => row.split(',').map(Number));

const getDistance = (pt1, pt2) => {
    return Math.sqrt((pt1[0] - pt2[0]) ** 2 + (pt1[1] - pt2[1]) ** 2 + (pt1[2] - pt2[2]) ** 2);
}


const getSolution = (rows, nbConnections, nbCircuits) => {
    const distances = new Map();

    // We get the nbConnections closest pts
    for (let i = 0; i < rows.length; i++) {
        for (let j = i + 1; j < rows.length; j++) {
            const distance = getDistance(rows[i], rows[j]);
            if (distances.size < nbConnections) {
                distances.set([i, j], distance);
            } else {
                const maxDistance = Math.max(...distances.values());
                if (distance < maxDistance) {
                    distances.delete(distances.keys().find(key => distances.get(key) === maxDistance));
                    distances.set([i, j], distance);
                }
            }
        }
    }
    // We join the junction boxes into circuits
    const circuits = []
    for (const [[pt1, pt2], value] of distances.entries()) {
        const circuitPt1 = circuits.findIndex(circuit => circuit.includes(pt1));
        const circuitPt2 = circuits.findIndex(circuit => circuit.includes(pt2));
        
        if (circuitPt1 !== -1 && circuitPt2 !== -1) {
            if (circuitPt1 !== circuitPt2) {
                circuits[circuitPt1] = [...circuits[circuitPt1], ...circuits[circuitPt2]];
                circuits.splice(circuitPt2, 1);
            }
        } else if (circuitPt1 !== -1) {
            circuits[circuitPt1].push(pt2);
        } else if (circuitPt2 !== -1) {
            circuits[circuitPt2].push(pt1);
        } else {
            circuits.push([pt1, pt2]);
        }
    }
    return circuits
        .sort((a, b) => b.length - a.length)
        .slice(0, nbCircuits)
        .reduce((acc, circuit) => acc * circuit.length, 1);
}

// Part 1
console.log(getSolution(rows, 1000, 3)); // 

module.exports = {
    getSolution,
};
