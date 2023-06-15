// Imports
const router = require('express').Router();
const { Bars, HistoricalRanks, Provinces, User } = require('../models');
const withAuth = require('../utils/auth');

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

// GET My account
router.get('/account', withAuth, async (req, res) => {
  try {
    // Get user id from session
    const user_id = req.session.user_id;
    const userData = await User.findByPk(user_id, {
      attributes: {
        exclude: ['password'],
      },
    });

    const user = userData.get({ plain: true });

    return res
      .status(200)
      .render('my-account', { user, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Change Password page
router.get('/change-password', withAuth, async (req, res) => {
  try {
    return res.status(200).render('change-password');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = router;
