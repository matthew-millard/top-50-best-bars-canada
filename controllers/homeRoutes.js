// Imports
const home = require('express').Router();

// GET Homepage
home.get('/', async (req, res) => {
  try {
    return res.status(200).render('layouts/main');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = home;
