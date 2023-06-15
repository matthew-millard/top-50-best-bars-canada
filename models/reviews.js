// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Bar = require('./bars.js');

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    review_body: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    review_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Bar,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Review',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  }
);

// Exports
module.exports = Review;
