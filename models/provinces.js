const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Provinces extends Model {}

Provinces.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    province_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Provinces',
  }
);

// Export
module.exports = Provinces;
