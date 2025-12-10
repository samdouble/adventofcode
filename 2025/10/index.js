const fs = require('fs');
const isEqual = require('lodash.isequal');

const input = fs.readFileSync('input.txt', 'utf8');
const machines = input.split('\n').map(machineStr => {
    const lightsStart = machineStr.indexOf('[');
    const lightsEnd = machineStr.indexOf(']');
    const lights = machineStr.slice(lightsStart + 1, lightsEnd).split('').map(l => l === '#' ? 1 : 0);

    const joltageStart = machineStr.indexOf('{');

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
    };
});

const arrayOfArrayIncludes = (arrayOfArrays, array) => {
    return arrayOfArrays.some(a => isEqual(a, array));
};

const applyButton = (lights, button) => {
    return lights.map((light, i) => (light + button[i]) % 2);
};

const getMinNumberPushesForMachine = (lights, buttons, currentLightsState, history, combinations) => {
    const diff = lights.map((light, i) => Math.abs(light - currentLightsState[i]));

    if (combinations[JSON.stringify(diff)]) {
        return combinations[JSON.stringify(diff)];
    }
    for (const [combination, nbPushes] of Object.entries(combinations)) {
        for (const button of buttons) {
            const newLightsStateWithButton = applyButton(JSON.parse(combination), button);
            if (
                !combinations[JSON.stringify(newLightsStateWithButton)]
                || combinations[JSON.stringify(newLightsStateWithButton)] > nbPushes + 1
            ) {
                combinations[JSON.stringify(newLightsStateWithButton)] = nbPushes + 1;
            }
        }
    }
    return getMinNumberPushesForMachine(lights, buttons, currentLightsState, history, combinations);
    // const sensibleButtons = buttons.filter(button => !arrayOfArrayIncludes(history, applyButton(currentLightsState, button)));
    // if (sensibleButtons.length === 0) {
    //     return Infinity;
    // }
// 
    // return 1 + Math.min(
    //     ...sensibleButtons.map(button => {
    //         const newLightsState = applyButton(currentLightsState, button);
    //         console.log("Testing button", button, newLightsState, history);
    //         return getMinNumberPushesForMachine(lights, buttons, newLightsState, [...history, newLightsState], combinations);
    //     })
    // );
};

const getMinTotalNumberOfPushes = (machines) => {
    let totalNbPushes = 0;
    for (const machine of machines) {
        const { lights } = machine;
        const buttons = machine.buttons.map(b => (
            new Array(lights.length).fill(0).map((_, index) => b.includes(index) ? 1 : 0))
        );
        const initialState = new Array(lights.length).fill(0);
        const combinations = {
            [JSON.stringify(initialState)]: 0,
        };
        const minNbPushesForMachine = getMinNumberPushesForMachine(lights, buttons, initialState, [initialState], combinations);
        totalNbPushes += minNbPushesForMachine;
    }
    return totalNbPushes;
};

// Part 1
console.log(getMinTotalNumberOfPushes(machines)); // 1st try, N pts

module.exports = {
    getMinTotalNumberOfPushes,
};
