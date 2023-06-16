// Initialize models
const Bars = require('./bars');
const HistoricalRanks = require('./historicalRanks');
const Provinces = require('./provinces');
const User = require('./User');
const Review = require('./reviews');
const City = require('./city');
const Image = require('./image');
// Define associations
Bars.hasMany(HistoricalRanks, {
  foreignKey: 'bar_id',
  onDelete: 'CASCADE',
});

HistoricalRanks.belongsTo(Bars, {
  foreignKey: 'bar_id',
});

Provinces.hasMany(Bars, {
  foreignKey: 'province_id',
  onDelete: 'CASCADE',
});

Bars.belongsTo(Provinces, {
  foreignKey: 'province_id',
});

User.hasMany(Review, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(User, {
  foreignKey: 'author_id',
});

Bars.hasMany(Review, {
  foreignKey: 'review_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(Bars, {
  foreignKey: 'review_id',
});

Provinces.hasMany(City, {
  foreignKey: 'province_id',
});

City.belongsTo(Provinces, {
  foreignKey: 'province_id',
});

Bars.hasOne(Image, {
  foreignKey: 'bar_id',
});

Image.belongsTo(Bars, {
  foreignKey: 'bar_id',
});

// Exports
module.exports = { Bars, HistoricalRanks, Provinces, User, Review, City, Image };
