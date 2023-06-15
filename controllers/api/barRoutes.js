const router = require('express').Router();
const {
  Bars,
  HistoricalRanks,
  Provinces,
  Review,
  User,
} = require('../../models');
const withAuth = require('../../utils/auth');

// GET Bar by ID
router.get('/:id', withAuth, async (req, res) => {
  const barId = req.params.id;
  try {
    const barData = await Bars.findByPk(barId, {
      include: [
        {
          model: Provinces,
          attributes: ['province_name'],
        },
        {
          model: HistoricalRanks,
          attributes: ['rank_position', 'year'],
        },
      ],
    });
    if (!barData) {
      return res.status(404).json({ message: 'No bar found with this id!' });
    }
    const bar = barData.get({ plain: true });

    // Get reviews
    const reviews = await Review.findAll({
      where: {
        review_id: barId,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const reviewsData = reviews.map((review) => review.get({ plain: true }));
    bar.reviews = reviewsData;
    console.log(bar);
    res.render('more-info', { bar, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = router;
