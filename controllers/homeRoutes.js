// Imports
const home = require('express').Router();
const { Bars, HistoricalRanks, Provinces } = require('../models');

// GET Homepage
home.get('/', async (req, res) => {
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

// Exports
module.exports = home;
