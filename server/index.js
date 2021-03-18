const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/appconfig');

const app = express();

app.set('config', config);
app.use(bodyParser.json());


const swagger = require('../utils/swagger');

process.on('SIGINT', () => {
    console.log('stopping the server', 'info');
    process.exit();
});

app.set('port', process.env.DEV_APP_PORT);
app.use('/api/docs', swagger.router);

app.use((req, res, next) => {
    req.identifier = uuidv4();
    const logString = `new request [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
    //console.log(logString, 'info');
    next();
});

app.use(require('../router'));

app.use((req, res, next) => {
    console.log('entered url is not hosted.', 'error');
    const err = new Error('Not Found');
    err.status = 404;
    res.status(err.status).json({ type: 'error', message: 'entered url is not hosted.' });
    next(err);
});

module.exports = app;
