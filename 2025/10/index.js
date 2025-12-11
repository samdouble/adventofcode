const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const machines = input.split('\n').map(machineStr => {
    const lightsStart = machineStr.indexOf('[');
    const lightsEnd = machineStr.indexOf(']');
    const lights = machineStr.slice(lightsStart + 1, lightsEnd).split('').map(l => l === '#' ? 1 : 0);

    const joltageStart = machineStr.indexOf('{');
    const joltageEnd = machineStr.indexOf('}');
    const joltages = machineStr.slice(joltageStart + 1, joltageEnd).split(',').map(Number);

    const buttons = machineStr
        .slice(lightsEnd + 1, joltageStart)
        .trim()
        .split(' ')
        .map(button => (
            button
                .replaceAll('(', '')
                .replaceAll(')', '')
                .split(',')
                .map(Number)
        ));
    return {
        lights,
        buttons,
        joltages,
    };
});

const applyButton = (lights, button, useJoltages = false) => {
    if (useJoltages) {
        return lights.map((light, i) => light + button[i]);
    }
    return lights.map((light, i) => (light + button[i]) % 2);
};

const isArrayMultipleOf = (array1, array2) => {
    const multiples = array1.map((value, index) => value / array2[index]);
    if (!Number.isInteger(multiples[0])) {
        return 0;
    }
    if (!multiples.every(multiple => multiple === multiples[0])) {
        return 0;
    }
    return multiples[0];
}

const getMinNumberPushesForMachine = (desiredState, buttons, currentState, combinations, useJoltages) => {
    const diff = desiredState.map((s, i) => Math.abs(s - currentState[i]));

    if (combinations[JSON.stringify(diff)]) {
        return combinations[JSON.stringify(diff)];
    }
    // if (useJoltages) {
    //     for (const [combination, nbPushes] of Object.entries(combinations)) {
    //         const multiple = isArrayMultipleOf(diff, JSON.parse(combination));
    //         if (multiple) {
    //             return nbPushes * multiple;
    //         }
    //     }
    // }
    for (const [combination, nbPushes] of Object.entries(combinations)) {
        const combinationsToCheck = [
            ...buttons.map(b => [JSON.stringify(b), 1]),
            // ...Object.entries(combinations),
        ];
        for (const [combination2, nbPushes2] of combinationsToCheck) {
            const newStateWithButton = applyButton(JSON.parse(combination), JSON.parse(combination2), useJoltages);
            if (
                !combinations[JSON.stringify(newStateWithButton)]
                || combinations[JSON.stringify(newStateWithButton)] > nbPushes + nbPushes2
            ) {
                combinations[JSON.stringify(newStateWithButton)] = nbPushes + nbPushes2;
            }
        }
    }
    return getMinNumberPushesForMachine(desiredState, buttons, currentState, combinations, useJoltages);
};

const getMinTotalNumberOfPushes = (machines, useJoltages = false) => {
    let totalNbPushes = 0;
    let i = 0;
    for (const machine of machines) {
        const { lights, joltages } = machine;
        const buttons = machine.buttons.map(b => (
            new Array(lights.length).fill(0).map((_, index) => b.includes(index) ? 1 : 0))
        );
        const initialState = new Array(buttons[0].length).fill(0);
        const combinations = {
            [JSON.stringify(initialState)]: 0,
        };
        const desiredState = useJoltages ? joltages : lights;
        const minNbPushesForMachine = getMinNumberPushesForMachine(desiredState, buttons, initialState, combinations, useJoltages);
        totalNbPushes += minNbPushesForMachine;
        i++;
    }
    return totalNbPushes;
};

// Part 1
console.log(getMinTotalNumberOfPushes(machines)); // 1st try, N pts
// Part 2
console.log(getMinTotalNumberOfPushes(machines, true)); // -

module.exports = {
    getMinTotalNumberOfPushes,
};
