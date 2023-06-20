const router = require('express').Router();
const { Bars, HistoricalRanks, Provinces, Review, User, Image } = require('../../models');
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
        {
          model: Image,
          attributes: ['url'],
        },
      ],
    });
    if (!barData) {
      return res.status(404).json({ message: 'No bar found with this id!' });
    }
    const bar = barData.get({ plain: true });
    console.log(bar);

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

    res.render('more-info', { bar, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// GET all bars
router.get('/', async (req, res) => {
  try {
    const barData = await Bars.findAll({
      include: [
        {
          model: Provinces,
          attributes: ['province_name'],
        },
        {
          model: HistoricalRanks,
          attributes: ['rank_position', 'year'],
        },
        {
          model: Image,
          attributes: ['url'],
        },
      ],
    });
    const bars = barData.map((bar) => bar.get({ plain: true }));
    res.status(200).json(bars);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// POST filtered bars
router.post('/search', async (req, res) => {
  try {
    // Save filtered bars to session
    req.session.filteredBars = req.body.filteredBars;

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});
// Exports
module.exports = router;
