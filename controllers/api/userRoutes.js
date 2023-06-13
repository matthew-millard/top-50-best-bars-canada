const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exists

    const userData = await User.create({
      email,
      password,
    });
    // Create user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      return res.status(200).json({ message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/logout', (req, res) => {});

// Export
module.exports = router;
