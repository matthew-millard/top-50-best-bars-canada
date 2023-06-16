// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Bar = require('./bars.js');

class Favourite extends Model {}

Favourite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bar_id: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: Bar,
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    bar_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Favourite',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  }
);

// Exports
module.exports = Favourite;
