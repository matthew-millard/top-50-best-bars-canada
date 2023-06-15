const router = require('express').Router();
const userRoutes = require('./userRoutes');
const barRoutes = require('./barRoutes');

router.use('/bars', barRoutes);
router.use('/users', userRoutes);

module.exports = router;
