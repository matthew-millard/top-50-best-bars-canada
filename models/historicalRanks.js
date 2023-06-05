const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class HistoricalRanks extends Model {}

HistoricalRanks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bar_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bars',
        key: 'id',
      },
    },
    rank_position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      // Although Sequelize is using DataTypes.INTEGER(4) for the year field,
      // in the database, this field is actually a MySQL YEAR type.
      // MySQL's YEAR type accepts 4-digit years in the range 1901 to 2155, and 0000.
      type: DataTypes.INTEGER(4), // 4 digit year (YYYY format)
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'HistoricalRanks',
  }
);

// Export
module.exports = HistoricalRanks;
