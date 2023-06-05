// Initialize models
const Bars = require('./bars');
const HistoricalRanks = require('./historicalRanks');
const Provinces = require('./provinces');

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

// Exports
module.exports = { Bars, HistoricalRanks, Provinces };
