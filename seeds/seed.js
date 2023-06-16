// Imports
const sequelize = require('../config/connection');
const {
  Bars,
  HistoricalRanks,
  Provinces,
  User,
  Review,
  City,
  Image,
} = require('../models');

// Seed data
const barData = require('./barSeedData.json');
const userData = require('./userSeedData.json');
const reviewData = require('./reviewSeedData.json');
const provinceData = require('./provinceSeedData.json');
const imageData = require('./imageSeedData.json');

// Seed database
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Drop all tables and recreate them

    await Provinces.bulkCreate(provinceData);

    // iterate over the barData array and create a new bar for each entry
    for (const bar of barData) {
      // create bar and save the created instance to use its id in the ranks creation
      const createdBar = await Bars.create({
        bar_name: bar.bar_name,
        address: bar.address,
        city_name: bar.city,
        province_id: bar.province_id,
        province_name: bar.province,
        website: bar.website,
        patio: bar.patio,
        description: bar.description,
      });

      // then iterate over each rank in the ranks array and create a historical rank
      for (const rank of bar.ranks) {
        await HistoricalRanks.create({
          bar_id: createdBar.id,
          rank_position: rank.rank_position,
          year: rank.year,
        });
      }
    }
    await User.bulkCreate(userData, {
      individualHooks: true,
    });

    await Review.bulkCreate(reviewData);
  } catch (error) {
    console.error(error);
  }

  await Image.bulkCreate(imageData);

  process.exit(0);
};

// Call seedDatabase function
seedDatabase();
