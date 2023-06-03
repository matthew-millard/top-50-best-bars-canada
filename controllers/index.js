// Imports
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

// Apply the homeRoutes to the express router for root ('/') path
router.use('/', homeRoutes);

// Exports
module.exports = router;
