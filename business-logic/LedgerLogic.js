const moment = require('moment');

function ammendToBreakdown(breakDownArray, startDate, endDate, amount) {
    breakDownArray.push({ startDate, endDate, amount });
}

function formatLeaseValue(amount) {
    if (!isNaN(amount)) {
        return parseFloat(amount.toFixed(2));
    }
    return amount
}


/**
 * Breakdown the payments on given frequency for a given time range
 * 
 * @param {*} leaseData - includes lease starting date, end date and amount to be paid weekly
 * @param {*} frequency - payment processing frequency
 */
function splitAccordingToFrequency(leaseData, frequency) {

    let leaseBeakdown = [];
    let lastStartDate;
    let lastEndDate;

    const startDateObj = moment(leaseData.startDate);
    const endDateObj = moment(leaseData.endDate);
    const regularPayment = leaseData.weeklyRent * (frequency / 7);
    let diff = endDateObj.diff(startDateObj, 'days');

    while (diff >= frequency - 1) {

        if (leaseBeakdown.length === 0) {
            lastStartDate = startDateObj;
        }
        else {
            lastStartDate = moment(lastEndDate).add(1, 'days');
        }

        lastEndDate = moment(lastStartDate).add(frequency - 1, 'days');
        ammendToBreakdown(leaseBeakdown, lastStartDate.toISOString(), lastEndDate.toISOString(), formatLeaseValue(regularPayment))
        diff = endDateObj.diff(lastEndDate, 'days');
    }

    if (diff > 0) {
        ammendToBreakdown(leaseBeakdown, lastEndDate.add(1, 'days').toISOString(), endDateObj.toISOString(), formatLeaseValue(((diff / frequency) * regularPayment)));
    }

    return leaseBeakdown;

}


/**
 * 
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
        result = splitAccordingToFrequency(leaseData, 30);
    }

    return result;
}


module.exports = { generateLedger };