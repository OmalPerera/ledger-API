const Joi = require('joi');
const BaseController = require('./BaseController');
const RequestHandler = require('../utils/RequestHandler');
const moment = require('moment');

const requestHandler = new RequestHandler();
const FREQUENCY_LIST = ['WEEKLY', 'FORTNIGHTLY', 'MONTHLY'];

class LeaseController extends BaseController {

	static async generateLedger(req, res) {
		try {

			const queryParams = req.query;

			const schema = {
				startDate: Joi.date().iso(),
				endDate: Joi.date().iso(),
				frequency: Joi.string().insensitive().valid(...[FREQUENCY_LIST]),
				weeklyRent: Joi.number().positive(),
				timezone: Joi.string(),
			};

			const { error } = Joi.validate(queryParams, schema);

			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid parameters : '); // + error.details[0].message


			let result;
			if (queryParams.frequency.toUpperCase() === FREQUENCY_LIST[0]) {
				result = splitDateIntoEqualIntervals(queryParams.startDate, queryParams.endDate, queryParams.weeklyRent, 7);
			}
			else if (queryParams.frequency.toUpperCase() === FREQUENCY_LIST[1]) {
				result = splitDateIntoEqualIntervals(queryParams.startDate, queryParams.endDate, queryParams.weeklyRent, 14);
			}
			else if (queryParams.frequency.toUpperCase() === FREQUENCY_LIST[2]) {
				result = splitDateIntoEqualIntervals(queryParams.startDate, queryParams.endDate, queryParams.weeklyRent, 30);
			}
			else {
				console.log('elseeee');
			}


			function splitDateIntoEqualIntervals(startDate, endDate, weeklyRent, frequency) {

				let leaseBeakdown = [];
				let lastStartDate;
				let lastEndDate;

				const startDateObj = moment(startDate);
				const endDateObj = moment(endDate);
				const regularPayment = weeklyRent * (frequency / 7);
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

			function ammendToBreakdown(breakDownArray, startDate, endDate, amount) {
				breakDownArray.push({ startDate, endDate, amount });
			}

			function formatLeaseValue(amount) {
				if (!isNaN(amount)) {
					return parseFloat(amount.toFixed(2));
				}
				return amount
			}

			return requestHandler.sendSuccess(res, 'Successfully Calculated')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
}

module.exports = LeaseController;
