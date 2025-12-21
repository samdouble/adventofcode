const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const reports = input.split('\n').map(l => l.split(/\s+/).map(Number));

const isBetween = (value, min, max) => {
    return value >= min && value <= max;
};

const isReportSafe = (report, tolerate1BadLevel = false) => {
    if (report.length <= 1) {
        return true;
    }
    const ascending = report[1] - report[0] > 0;
    for (let i = 0; i < report.length - 1; i++) {
        if (
            (ascending && !isBetween(report[i+1] - report[i], 1, 3))
            || (!ascending && !isBetween(report[i] - report[i+1], 1, 3))
        ) {
            if (!tolerate1BadLevel) {
                return false;
            } else {
                return (
                    isReportSafe(report.filter((_, index) => index !== i - 1))
                    || isReportSafe(report.filter((_, index) => index !== i))
                    || isReportSafe(report.filter((_, index) => index !== i + 1))
                );
            }
        }
    }
    return true;
}

const getNbSafeReports = (reports, tolerate1BadLevel = false) => {
    let nbSafeReports = 0;
    for (const report of reports) {
        if (isReportSafe(report, tolerate1BadLevel)) {
            nbSafeReports++;
        }
    }
    return nbSafeReports;
};

// Part 1
console.log(getNbSafeReports(reports));
// Part 2
console.log(getNbSafeReports(reports, true));

module.exports = {
    isReportSafe,
    getNbSafeReports,
};
