// Initialize models
const Bars = require('./bars');
const HistoricalRanks = require('./historicalRanks');
const Provinces = require('./provinces');
const User = require('./User');
const Review = require('./reviews');

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

// Exports
module.exports = { Bars, HistoricalRanks, Provinces, User, Review };
