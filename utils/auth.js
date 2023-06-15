const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    return res
      .status(401)
      .render('login', {
        error: 'You must be logged in to access that feature.',
      });
  } else {
    next();
  }
};

module.exports = withAuth;
