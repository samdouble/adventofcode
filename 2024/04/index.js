const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

const countWordOnLine = (chars, word) => {
    if (word.length === 1) {
        let regex = new RegExp(word, "g");
        return (chars.join('').match(regex) || []).length;
    }
    let count = 0;
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === word[0]) {
            count += countWordOnLine(chars.slice(i), word.substring(1))
        }
    }
    return count;
};

const countWord = (lines, word) => {
    let count = 0;
    for (const line of lines) {
        count += countWordOnLine(line.split(''), word);
    }
    return count;
};

// Part 1
//console.log(countWord(lines, 'XMAS'));

module.exports = {
    countWord,
    countWordOnLine,
};
