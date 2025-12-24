const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const map = input.split('\n');

const move = (map, position, orientation) => {
    const [x, y] = position;
    if (orientation === 'up') {
        if (y === 0) {
            return [position];
        } else if (map[y - 1][x] === '#') {
            return [position, ...move(map, position, 'right')];
        }
        return [position, ...move(map, [x, y - 1], orientation)];
    } else if (orientation === 'down') {
        if (y === map.length - 1) {
            return [position];
        } else if (map[y + 1][x] === '#') {
            return [position, ...move(map, position, 'left')];
        }
        return [position, ...move(map, [x, y + 1], orientation)];
    } else if (orientation === 'left') {
        if (x === 0) {
            return [position];
        } else if (map[y][x - 1] === '#') {
            return [position, ...move(map, position, 'up')];
        }
        return [position, ...move(map, [x - 1, y], orientation)];
    } else if (orientation === 'right') {
        if (x === map[y].length - 1) {
            return [position];
        } else if (map[y][x + 1] === '#') {
            return [position, ...move(map, position, 'down')];
        }
        return [position, ...move(map, [x + 1, y], orientation)];
    }
};

const getNbMoves = (map) => {
    const initialY = map.findIndex(l => {
        return l.includes('^') || l.includes('v') || l.includes('>') || l.includes('<')
    });
    const initialX = map[initialY].split('').findIndex(l => {
        return l.includes('^') || l.includes('v') || l.includes('>') || l.includes('<')
    });
    let orientation = 'up';
    if (map[initialY][initialX] === 'v') { orientation = 'down'; }
    else if (map[initialY][initialX] === '<') { orientation = 'left'; }
    else if (map[initialY][initialX] === '>') { orientation = 'right'; }

    const positions = move(map, [initialX, initialY], orientation);
    const distinctPositions = new Set(positions);
    return distinctPositions.size;
};

// Part 1
console.log(getNbMoves(map));

module.exports = {
    getNbMoves,
};
