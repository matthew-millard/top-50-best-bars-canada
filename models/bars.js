  const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bars extends Model {}

Bars.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bar_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Provinces',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Bars',
  }
);

// Export
module.exports = Bars;
