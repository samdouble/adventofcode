const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.split('\n');

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

module.exports = {
    countSplits,
};
