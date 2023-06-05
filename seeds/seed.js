// Imports
const sequelize = require('../config/connection');
const { Bars, HistoricalRanks, Provinces } = require('../models');

// Seed data
const testData = require('./testingData.json');

// Seed database
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Drop all tables and recreate them

    // Iterate over each bar in the array
    for (const bar of testData) {
      // first create the province because it is a foreign key in the bars table
      const createdProvince = await Provinces.create({
        province_name: bar.province,
      });

      // then create a bar, with the province_id set to the id of the created province
      const createdBar = await Bars.create({
        bar_name: bar.bar_name,
        province_id: createdProvince.id,
        address: bar.address,
        patio: bar.patio,
        website: bar.website,
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

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit with an error code
  }
};

// Run the seed file
seedDatabase();
