const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n').map(l => l.split(/\s+/).map(Number));
const list1 = lines.map(l => l[0]);
const list2 = lines.map(l => l[1]);

const getTotalDistance = (l1, l2) => {
    const sortedList1 = l1.sort();
    const sortedList2 = l2.sort();
    let totalDistance = 0;
    for (let i = 0; i < sortedList1.length; i++) {
        totalDistance += Math.abs(sortedList1[i] - sortedList2[i]);
    }
    return totalDistance;
}

const getSimilarityScore = (l1, l2) => {
    let similarityScore = 0;
    for (let i = 0; i < l1.length; i++) {
        similarityScore += l1[i] * l2.filter(e => e === l1[i]).length;
    }
    return similarityScore;
};

// Part 1
console.log(getTotalDistance(list1, list2));
// Part 2
console.log(getSimilarityScore(list1, list2));

module.exports = {
    getTotalDistance,
    getSimilarityScore,
};
