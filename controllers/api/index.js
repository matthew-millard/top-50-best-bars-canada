const router = require('express').Router();
const userRoutes = require('./userRoutes');
const barRoutes = require('./barRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/bars', barRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
