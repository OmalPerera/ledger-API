module.exports = {
	app: {
		port: process.env.DEV_APP_PORT || 3000,
		appName: process.env.APP_NAME || 'ledger-api',
		env: process.env.NODE_ENV || 'development',
	},
	auth: {
		jwt_secret: process.env.JWT_SECRET || 'aazd2VbFNljgqsY3JldVmV==', //TODO: better to get form env
		jwt_expiresin: process.env.JWT_EXPIRES_IN || '1d',
		saltRounds: process.env.SALT_ROUND || 10,
		refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'eVBvd2VbFNlY3JldVmVyyZnVsA==',
		refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || '2d',
	},

};
