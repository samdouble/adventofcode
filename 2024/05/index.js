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

const reorder = (update, graph) => {
    let reorderedUpdate = [];
    let incorrectlyOrdered = [...update];
    while (incorrectlyOrdered.length) {
        for (let i = incorrectlyOrdered.length - 1; i >= 0; i--) {
            const nodesThatMustGoAfter = graph.get(incorrectlyOrdered[i]) || [];
            let correctlyPlaced = true;
            for (let j = 0; j < incorrectlyOrdered.length; j++) {
                if (nodesThatMustGoAfter.includes(incorrectlyOrdered[j])) {
                    correctlyPlaced = false;
                    break;
                }
            }
            if (correctlyPlaced) {
                reorderedUpdate = [incorrectlyOrdered[i], ...reorderedUpdate];
                incorrectlyOrdered.splice(i, 1);
            }
        }
    }
    return reorderedUpdate;
};

const getGraphFromOrders = (orders) => {
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
    return graph;
};

const getResult = (orders, updates, incorrect = false) => {
    const graph = getGraphFromOrders(orders);

    if (incorrect) {
        const incorrectOrderedUpdates = updates
            .filter(update => !isUpdateCorrect(update, graph));
        const reorderedUpdates = incorrectOrderedUpdates
            .map(update => reorder(update, graph));
        return reorderedUpdates
            .reduce((acc, update) => acc + Number(update[(update.length - 1) / 2]), 0);
    }
    const correctOrderedUpdates = updates
        .filter(update => isUpdateCorrect(update, graph));
    return correctOrderedUpdates
        .reduce((acc, update) => acc + Number(update[(update.length - 1) / 2]), 0);
};

// Part 1
console.log(getResult(orders, updates));
// Part 2
console.log(getResult(orders, updates, true));

module.exports = {
    getResult,
    getGraphFromOrders,
    reorder,
};
