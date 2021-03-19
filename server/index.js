const express = require('express');
const bodyParser = require('body-parser');
const config = require('config/appconfig');

const app = express();

app.set('config', config);
app.use(bodyParser.json());

const swagger = require('utils/swagger');

process.on('SIGINT', () => {
    console.log('stopping the server', 'info');
    process.exit();
});

app.set('port', process.env.DEV_APP_PORT);
app.use('/api/docs', swagger.router);
app.use(require('router'));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.status(err.status).json({ type: 'error', message: 'entered url is not hosted.' });
    next(err);
});

module.exports = app;
