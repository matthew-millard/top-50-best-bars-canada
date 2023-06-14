// Imports
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/index');
// Apply the homeRoutes to the express router for root ('/') path
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Exports
module.exports = router;
