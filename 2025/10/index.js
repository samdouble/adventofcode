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

const getMinNumberPushesForMachine = (lights, buttons, currentLightsState, history, minNbPushes) => {
    const diff = lights.map((light, i) => Math.abs(light - currentLightsState[i]));

    if (arrayOfArrayIncludes(buttons, diff)) {
        return 1;
    }
    for (const button of buttons) {
        console.log("Testing button", button, history, minNbPushes);
        const newLightsState = applyButton(currentLightsState, button);
        if (arrayOfArrayIncludes(history, newLightsState)) {
            continue;
        }
        const minNbPushesWithButton = 1 + getMinNumberPushesForMachine(lights, buttons, newLightsState, [...history, newLightsState], minNbPushes);
        if (minNbPushesWithButton < minNbPushes) {
            minNbPushes = minNbPushesWithButton;
        }
    }
    return Infinity;
};

const getMinTotalNumberOfPushes = (machines) => {
    let totalNbPushes = 0;
    for (const machine of machines) {
        const { lights } = machine;
        const buttons = machine.buttons.map(b => (
            new Array(lights.length).fill(0).map((_, index) => b.includes(index) ? 1 : 0))
        );
        const initialState = new Array(lights.length).fill(0);
        const minNbPushesForMachine = getMinNumberPushesForMachine(lights, buttons, initialState, [initialState], Infinity);
        totalNbPushes += minNbPushesForMachine;
    }
    return totalNbPushes;
};

// Part 1
// console.log(getMinTotalNumberOfPushes(machines)); // 

module.exports = {
    getMinTotalNumberOfPushes,
};
