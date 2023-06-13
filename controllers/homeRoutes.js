// Imports
const router = require('express').Router();
const { Bars, HistoricalRanks, Provinces } = require('../models');

// GET Homepage
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
      ],
    });

    // Serialize data so the template can read it
    const bars = barData.map((bar) => bar.get({ plain: true }));
    console.table(bars);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      bars,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Get Login/Sign up route

router.get('/login', async (req, res) => {
  try {
    return res.status(200).render('login');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// GET Sign-up
router.get('/signup', async (req, res) => {
  try {
    return res.status(200).render('signup');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = router;
