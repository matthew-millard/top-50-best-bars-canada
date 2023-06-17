// Imports
const router = require('express').Router();
const {
  Bars,
  HistoricalRanks,
  Provinces,
  User,
  Image,
  Favourite,
  Review,
} = require('../models');
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
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Get Login/Sign up route

router.get('/login', async (req, res) => {
  try {
    return res
      .status(200)
      .render('login', { logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// GET Logout
router.get('/logout', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// GET Sign-up
router.get('/register', async (req, res) => {
  try {
    return res
      .status(200)
      .render('register', { logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// GET My account
router.get('/my-account', withAuth, async (req, res) => {
  try {
    // Get user id from session
    const user_id = req.session.user_id;
    const userData = await User.findByPk(user_id, {
      attributes: {
        exclude: ['password'],
      },
    });

    const favsData = await Favourite.findAll({
      where: { user_id: user_id },
    });

    const favs = favsData.map((fav) => fav.get({ plain: true }));

    const reviewsData = await Review.findAll({
      where: { author_id: user_id },
    });

    const reviews = reviewsData.map((rev) => rev.get({ plain: true }));

    const user = userData.get({ plain: true });

    return res
      .status(200)
      .render('my-account', {
        user,
        favs,
        reviews,
        logged_in: req.session.logged_in,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Change Password page
router.get('/change-password', withAuth, async (req, res) => {
  try {
    return res
      .status(200)
      .render('change-password', { logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// The List Page
router.get('/the-list', async (req, res) => {
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

    // Serialize data so the template can read it
    const bars = barData.map((bar) => bar.get({ plain: true }));
    // Pass serialized data and session flag into template

    res.render('the-list', {
      bars,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// GET Search
router.get('/search', async (req, res) => {
  try {
    return res.status(200).render('search', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// GET Search Results
router.get('/search-results', async (req, res) => {
  try {
    // Retrieve search results from session
    const bars = req.session.filteredBars;

    // Render search results page
    return res.status(200).render('search-results', {
      bars,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = router;
