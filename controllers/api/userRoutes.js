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
    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      return res
        .status(404)
        .json({ message: 'Incorrect email or password, please try again.' });
    }

    const validPassword = await userData.checkPassword(password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password.' });
    }
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

// Post Sign up
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    await User.create({
      username,
      email,
      password,
    });
    return res
      .status(200)
      .json({ message: 'You have successfully created an account.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/logout', (req, res) => {});

// Export
module.exports = router;
