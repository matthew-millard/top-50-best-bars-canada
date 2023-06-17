const router = require('express').Router();
const userRoutes = require('./userRoutes');
const barRoutes = require('./barRoutes');
const reviewRoutes = require('./reviewRoutes');
const favouriteRoutes = require('./favouriteRoutes');

router.use('/bars', barRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/favourites', favouriteRoutes);

module.exports = router;
