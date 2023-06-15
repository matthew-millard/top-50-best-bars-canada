const router = require('express').Router();
const { Bars, HistoricalRanks, Provinces } = require('../../models');
const withAuth = require('../../utils/auth');

// GET Bar by ID
router.get('/:id', async (req, res) => {
  const barId = req.params.id;
  try {
    const barData = await Bars.findByPk(barId, {
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
    if (!barData) {
      return res.status(404).json({ message: 'No bar found with this id!' });
    }
    const bar = barData.get({ plain: true });
    console.log(bar);
    return res.status(200).json(bar);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = router;
