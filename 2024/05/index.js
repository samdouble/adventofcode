const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

const orders = lines
    .filter(l => l.includes('|'))
    .map(l => l.split('|'));

const updates = lines
    .filter(l => !l.includes('|'))
    .map(l => l.split(','));

const isUpdateCorrect = (update, graph) => {
    for (let i = 0; i < update.length; i++) {
        const nodesThatMustGoAfter = graph.get(update[i]) || [];
        for (let j = 0; j < i; j++) {
            if (nodesThatMustGoAfter.includes(update[j])) {
                return false;
            }
        }
    }
    return true;
};

const getResult = (orders, updates) => {
    const graph = new Map();
    for (const order of orders) {
        let before = order[0];
        let after = [order[1]];
        if (!graph.has(before)) {
            graph.set(before, []);
        }
        while (after.length) {
            graph.get(before).push(...after);
            after = graph.get(after) || [];
        }
    }

    const correctOrderedUpdates = updates
        .filter(update => isUpdateCorrect(update, graph));
    
    return correctOrderedUpdates.reduce((acc, update) => acc + Number(update[(update.length - 1) / 2]), 0)
};

// Part 1
console.log(getResult(orders, updates));

module.exports = {
    getResult,
};
