const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

console.log(lines.length);
const INITIAL_POS = 50;
const MIN_POS = 0;
const MAX_POS = 99;
const NB_POSITIONS = MAX_POS - MIN_POS + 1;

const rotate = (pos, direction, distance) => {
    if (direction === 'R') {
        return (pos + distance) % NB_POSITIONS;
    }
    if (direction === 'L') {
        return (pos - distance + NB_POSITIONS) % NB_POSITIONS;
    }
    throw new Error('Invalid direction');
};

const getPassword = (rotations) => {
    let currentPosition = INITIAL_POS;
    let password = 0;

    for (const rotation of rotations) {
        const direction = rotation.slice(0, 1);
        const distance = parseInt(rotation.slice(1));

        currentPosition = rotate(currentPosition, direction, distance);

        if (currentPosition === 0) {
            password++;
        }
    }
    return password;
}

console.log(getPassword(lines));

module.exports = {
    rotate,
    getPassword,
};
