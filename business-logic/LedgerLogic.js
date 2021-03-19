const moment = require('moment');

function ammendToBreakdown(breakDownArray, startDate, endDate, amount) {
    breakDownArray.push({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        amount: formatLeaseValue(amount)
    });
}

function formatLeaseValue(amount) {
    if (!isNaN(amount)) {
        return parseFloat(amount.toFixed(2));
    }
    return amount
}

/**
 * Calculate basic amount to be paid for line item 
 */
function basePayment(weeklyRent, frequency) {
    if (frequency === 'monthly') {
        return (weeklyRent / 7) * (365 / 12);
    } else {
        return (weeklyRent / 7 * frequency);
    }
}


/**
 * Breakdown the payments on given frequency for a given time range
 * 
 * @param {*} leaseData - includes lease starting date, end date and amount to be paid weekly
 * @param {*} frequency - payment processing frequency
 */
function splitAccordingToFrequency(leaseData, frequency) {

    let leaseBeakdown = [];
    let prevStartDate;
    let prevEndDate;

    const startDateObj = moment(leaseData.startDate);
    const endDateObj = moment(leaseData.endDate);

    if (frequency === 'monthly') {
        let diff = endDateObj.diff(startDateObj, 'months');
        const regularPayment = basePayment(leaseData.weeklyRent, 'monthly');

        for (i = 0; i < diff; i++) {
            prevStartDate = moment(startDateObj).add(i, 'M');
            prevEndDate = moment(startDateObj).add(i + 1, 'M').subtract(1, 'days');
            ammendToBreakdown(leaseBeakdown, prevStartDate, prevEndDate, regularPayment);
        }

        diff = endDateObj.diff(prevEndDate, 'days');
        if (diff > 0) {
            ammendToBreakdown(leaseBeakdown, prevEndDate.add(1, 'days'), endDateObj, (leaseData.weeklyRent / 7 * diff));
        }

    } else {
        let diff = endDateObj.diff(startDateObj, 'days');
        const regularPayment = basePayment(leaseData.weeklyRent, frequency)

        while (diff >= frequency - 1) {

            if (leaseBeakdown.length === 0) {
                prevStartDate = startDateObj;
            }
            else {
                prevStartDate = moment(prevEndDate).add(1, 'days');
            }

            prevEndDate = moment(prevStartDate).add(frequency - 1, 'days');
            ammendToBreakdown(leaseBeakdown, prevStartDate, prevEndDate, regularPayment)
            diff = endDateObj.diff(prevEndDate, 'days');
        }

        if (diff > 0) {
            ammendToBreakdown(leaseBeakdown, prevEndDate.add(1, 'days'), endDateObj, ((diff / frequency) * regularPayment));
        }
    }

    return leaseBeakdown;

}


/**
 * Initiate ledger Calculation depends on Payment frequency
 * @param {*} FREQUENCY_LIST 
 * @param {*} leaseData 
 */
function generateLedger(FREQUENCY_LIST, leaseData) {

    let result;
    const paymentFrequency = leaseData.frequency.toUpperCase();
    if (paymentFrequency === FREQUENCY_LIST[0]) {
        result = splitAccordingToFrequency(leaseData, 7);
    }
    else if (paymentFrequency === FREQUENCY_LIST[1]) {
        result = splitAccordingToFrequency(leaseData, 14);
    }
    else if (paymentFrequency === FREQUENCY_LIST[2]) {
        result = splitAccordingToFrequency(leaseData, 'monthly');
    }

    return result;
}


module.exports = { generateLedger, basePayment, splitAccordingToFrequency };