const Joi = require('joi');
const jwt = require('jsonwebtoken');
const RequestHandler = require('../utils/RequestHandler');
const BaseController = require('../controllers/BaseController');
const config = require('../config/appconfig');

const requestHandler = new RequestHandler();
const tokenList = {};

/* dummy user data */
const DUMMY_USER = {
	id: 1,
	email: 'admin@company.com',
	password: 'pass@123'
}

class AuthController extends BaseController {
	static async login(req, res) {
		try {
			const schema = {
				email: Joi.string().email().required(),
				password: Joi.string().required(),
			};
			const { error } = Joi.validate({
				email: req.body.email,
				password: req.body.password,
			}, schema);

			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');


			if (DUMMY_USER.email !== req.body.email) {
				requestHandler.throwError(400, 'bad request', 'invalid email address')();
			}

			/** TODO : ideally password Hashes should be matched, but this is just for mimic the authentication */
			if (req.body.password === DUMMY_USER.password) {
				requestHandler.throwIf(r => !r, 400, 'incorrect', 'failed to login bad credentials')
			}

			req.params.id = DUMMY_USER.id;
			const token = jwt.sign({ DUMMY_USER }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS256' });

			const refreshToken = jwt.sign({
				DUMMY_USER,
			}, config.auth.refresh_token_secret, {
				expiresIn: config.auth.refresh_token_expiresin,
			});
			const response = {
				status: 'Logged in',
				token,
				refreshToken,
			};
			tokenList[refreshToken] = response;
			requestHandler.sendSuccess(res, 'User logged in Successfully')({ token, refreshToken });
		} catch (error) {
			requestHandler.sendError(req, res, error);
		}
	}
}


module.exports = AuthController;
