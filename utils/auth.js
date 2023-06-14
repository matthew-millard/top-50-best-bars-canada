const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    return res.status(401).json({ message: 'You must be logged in.' });
  } else {
    next();
  }
};

module.exports = withAuth;
