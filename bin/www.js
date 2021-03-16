#!/usr/bin/env node

const http = require('http');
const app = require('../server/index');

const server = http.createServer(app);


function normalizePort(val) {
	const port = parseInt(val, 10);

	if (Number.isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}


/* Get port from environment and store in Express. */
const port = normalizePort(process.env.DEV_APP_PORT || '3000');
app.set('port', port);



/* Event listener for HTTP server "error" event. */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? `Pipe ${port}`
		: `Port ${port}`;

	/* handle specific listen errors */
	switch (error.code) {
		case 'EACCES':
			console.log(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.log(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}


/* Event listener for HTTP server "listening" event */
function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? `pipe ${addr}`
		: `port ${addr.port}`;

	console.log(`the server started listining on port ${bind}`, 'info');
}


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
