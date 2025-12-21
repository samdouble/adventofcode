const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const reports = input.split('\n').map(l => l.split(/\s+/).map(Number));

const isBetween = (value, min, max) => {
    return value >= min && value <= max;
};

const isReportSafe = (report) => {
    if (report.length <= 1) {
        return true;
    }
    const ascending = report[1] - report[0] > 0;
    for (let i = 0; i < report.length - 1; i++) {
        if (ascending) {
            if (!isBetween(report[i+1] - report[i], 1, 3)) {
                return false;
            }
        } else {
            if (!isBetween(report[i] - report[i+1], 1, 3)) {
                return false;
            }
        }
    }
    return true;
}

const getNbSafeReports = (reports) => {
    let nbSafeReports = 0;
    for (const report of reports) {
        if (isReportSafe(report)) {
            nbSafeReports++;
        }
    }
    return nbSafeReports;
};

// Part 1
console.log(getNbSafeReports(reports));

module.exports = {
    isReportSafe,
    getNbSafeReports,
};
