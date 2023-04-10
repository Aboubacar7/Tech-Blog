const router = require('express').Router();

const apiRoutes = require('./api');
const homeroutes = require('./homeRoutes');
const dashboardroutes = require('./dashboardRoutes')

router.use('/', homeroutes);
router.use('/dashboard', dashboardroutes);
router.use('/api', apiRoutes);

module.exports = router;