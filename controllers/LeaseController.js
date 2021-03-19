const Joi = require('joi');
const BaseController = require('./baseController');
const RequestHandler = require('../utils/requestHandler');
const LedgerLogic = require('../business-logic/ledgerLogic');

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
			requestHandler.validateJoi(error, 400, 'bad Request', 'invalid parameters');

			const result = LedgerLogic.generateLedger(FREQUENCY_LIST, queryParams);
			return requestHandler.sendSuccess(res, 'Successfully Calculated')({ result });

		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
}

module.exports = LeaseController;
