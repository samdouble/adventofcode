const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

const getPossibilitiesForBeam = (position, beamRows) => {
    const possibilities = [];
    if (beamRows.length === 0) {
        possibilities.push([position]);
    }
    else if (beamRows[0][position] === '^') {
        for (const possibility of getPossibilitiesForBeam(position - 1, beamRows.slice(1))) {
            possibilities.push([position - 1, ...possibility]);
        }
        for (const possibility of getPossibilitiesForBeam(position + 1, beamRows.slice(1))) {
            possibilities.push([position + 1, ...possibility]);
        }
    }
    else if (beamRows[0][position] === '.') {
        for (const possibility of getPossibilitiesForBeam(position, beamRows.slice(1))) {
            possibilities.push([position, ...possibility]);
        }
    }
    return possibilities;
}

const countQuantumSplits = (rows) => {
    const initialPosition = rows[0].indexOf('S');
    return getPossibilitiesForBeam(initialPosition, rows.slice(1)).length;
}

const countSplits = (rows) => {
    const initialPosition = rows[0].indexOf('S');
    let nbBeamSplits = 0;
    let beamRows = [new Set([initialPosition])];
    for (let i = 1; i < rows.length; i++) {
        beamRows.push(new Set());
        for (const beam of beamRows[i-1]) {
            if (rows[i][beam] === '^') {
                nbBeamSplits++;
                beamRows[i].add(beam - 1);
                beamRows[i].add(beam + 1);
            } else if (rows[i][beam] === '.') {
                beamRows[i].add(beam);
            }
        }
    }
    return nbBeamSplits;
}

// Part 1
console.log(countSplits(rows)); // 1st try, N pts
// Part 2
console.log(countQuantumSplits(rows)); // 1st try, N pts

module.exports = {
    countSplits,
    countQuantumSplits,
};
