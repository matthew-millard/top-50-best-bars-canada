const router = require('express').Router();
const {
  Bars,
  HistoricalRanks,
  Provinces,
  Review,
  User,
  Image,
  Favourite,
} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const { bar_id } = req.body;
    const bar = await Bars.findOne({ where: { id: bar_id } });
    const bar_name = bar.bar_name;
    const website = bar.website;
    // console.log('post body:', bar_id);
    // console.log('user:', user_id);
    // console.log('bar name:', bar_name);
    // console.log('website:', website);

    // Create the favourite in the database
    const newFavourite = await Favourite.create({
      bar_id: bar_id,
      user_id: user_id,
      bar_name: bar_name,
      website: website,
    });

    // If unsuccessful, return error
    if (!newFavourite) {
      return res.status(400).json({ message: 'Unable to create favourite' });
    }

    // If successful, return status 200 and success message
    return res.status(200).json({ message: 'Favourite posted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
