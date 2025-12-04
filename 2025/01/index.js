const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

const INITIAL_POS = 50;
const MIN_POS = 0;
const MAX_POS = 99;
const NB_POSITIONS = MAX_POS - MIN_POS + 1;

const rotate = (pos, direction, distance) => {
    if (direction === 'R') {
        let newPos = pos + distance;
        let nbClickedOn0 = 0;
        while (newPos > MAX_POS) {
            newPos -= NB_POSITIONS;
            nbClickedOn0++;
        }
        return {
            newPos: newPos % NB_POSITIONS,
            nbClickedOn0,
        };
    }
    if (direction === 'L') {
        let nbClickedOn0 = 0;
        if (pos === MIN_POS) {
            nbClickedOn0--;
        }
        let newPos = pos - distance;
        while (newPos <= MIN_POS) {
            newPos += NB_POSITIONS;
            nbClickedOn0++;
        }
        return {
            newPos: newPos % NB_POSITIONS,
            nbClickedOn0: nbClickedOn0 % NB_POSITIONS,
        };
    }
    throw new Error('Invalid direction');
};

const getPassword = (rotations, countEveryClickOn0 = false) => {
    let currentPosition = INITIAL_POS;
    let password = 0;

    for (const rotation of rotations) {
        const direction = rotation.slice(0, 1);
        const distance = parseInt(rotation.slice(1));

        const { newPos, nbClickedOn0 } = rotate(currentPosition, direction, distance);
        currentPosition = newPos;

        if (countEveryClickOn0) {
            password += nbClickedOn0;
        } else if (!countEveryClickOn0 && currentPosition === 0) {
            password++;
        }
    }
    return password;
}

// Part 1
console.log(getPassword(lines));
// Part 2
console.log(getPassword(lines, true));

module.exports = {
    rotate,
    getPassword,
};
