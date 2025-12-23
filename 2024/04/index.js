const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

const countWordOnLine = (chars, word, adjacent) => {
    if (!adjacent) {
        if (word.length === 1) {
            let regex = new RegExp(word, "g");
            return (chars.join('').match(regex) || []).length;
        }
        let count = 0;
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] === word[0]) {
                count += countWordOnLine(chars.slice(i), word.substring(1), adjacent);
            }
        }
        return count;
    }
    let regex = new RegExp(word, "g");
    return (chars.join('').match(regex) || []).length;
};

const countWord = (lines, word, adjacent) => {
    let count = 0;
    // Horizontally
    for (const line of lines) {
        count += countWordOnLine(line.split(''), word, adjacent);
        // Reverse
        count += countWordOnLine(line.split(''), word.split('').reverse().join(''), adjacent);
    }
    // Vertically
    const columns = lines[0].split('')
        .map((_c, index) => {
            return lines.reduce((acc, l) => acc + l[index], [])
        });
    for (const column of columns) {
        count += countWordOnLine(column.split(''), word, adjacent);
        // Reverse
        count += countWordOnLine(column.split(''), word.split('').reverse().join(''), adjacent);
    }
    // Diagonally SW-NE
    const diagonalsSWNE = [];
    for (let i = 0; i < lines.length; i++) {
        let diagonal = '';
        for (let j = 0; j <= Math.min(i, lines[i].length); j++) {
            diagonal += lines[i - j][j];
        }
        diagonalsSWNE.push(diagonal);
    }
    for (let i = 1; i < lines[lines.length - 1].length; i++) {
        let diagonal = '';
        for (let j = Math.min(lines.length, lines[i].length - 1); j >= 1; j--) {
            if (lines[i].length - j - 1 + i > lines[j].length - 1) {
                break;
            }
            diagonal += lines[j][lines[i].length - j - 1 + i];
        }
        diagonalsSWNE.push(diagonal);
    }
    for (const diagonal of diagonalsSWNE) {
        count += countWordOnLine(diagonal.split(''), word, adjacent);
        // Reverse
        count += countWordOnLine(diagonal.split(''), word.split('').reverse().join(''), adjacent);
    }
    // Diagonally NW - SE
    const diagonalsNWSE = [];
    //(0, 0)(1, 1)
    for (let i = 0; i < lines.length; i++) {
        let diagonal = '';
        for (let j = 0; j <= Math.min(lines.length - 1 - i, lines[i].length - 1); j++) {
            diagonal += lines[j + i][j];
        }
        diagonalsNWSE.push(diagonal);
    }
    for (let i = 1; i < lines[0].length; i++) {
        let diagonal = '';
        for (let j = 0; j < lines.length; j++) {
            if (j + i > lines[j].length - 1) {
                break;
            }
            diagonal += lines[j][j + i];
        }
        diagonalsNWSE.push(diagonal);
    }
    for (const diagonal of diagonalsNWSE) {
        count += countWordOnLine(diagonal.split(''), word, adjacent);
        // Reverse
        count += countWordOnLine(diagonal.split(''), word.split('').reverse().join(''), adjacent);
    }
    return count;
};

// Part 1
console.log(countWord(lines, 'XMAS', true));

module.exports = {
    countWord,
    countWordOnLine,
};
