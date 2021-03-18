const router = require('express').Router();

router.use('/', require('./authRouter'));

router.use('/lease', require('./leaseRouter'));

module.exports = router;
