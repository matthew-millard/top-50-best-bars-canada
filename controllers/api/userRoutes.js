const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const { clearUserSessions } = require('../../utils/sessionUtils');

// Create a new user
router.post('/', async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Clear user sessions
    await clearUserSessions(email, req.sessionStore);
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

// Delete user account
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    // Get user id
    const userId = req.params.id;
    // Delete user account from database

    const deletedUser = await User.destroy({
      where: { id: userId },
    });

    return res.status(200).json(deletedUser);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Change user password
router.put('/change-password', withAuth, async (req, res) => {
  const userId = req.session.user_id;
  const { currentPassword, newPassword } = req.body;
  console.log('hi there');
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    // Check if current password is correct
    const isPasswordCorrect = user.checkPassword(currentPassword);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Incorrect current password.' });
    }

    user.password = newPassword; // No need to hash the password here, the 'beforeUpdate' hook will handle it
    console.log('hi there again');
    // Update the user's password in the database
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'An error occured while changing the password.' });
  }
});

// Export
module.exports = router;
