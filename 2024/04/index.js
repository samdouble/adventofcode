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
            return lines.reduce((acc, l) => acc + l.split('')[index], [])
        });
    for (const column of columns) {
        count += countWordOnLine(column.split(''), word, adjacent);
        // Reverse
        count += countWordOnLine(column.split(''), word.split('').reverse().join(''), adjacent);
    }
    return count;
};

// Part 1
//console.log(countWord(lines, 'XMAS', true));

module.exports = {
    countWord,
    countWordOnLine,
};
