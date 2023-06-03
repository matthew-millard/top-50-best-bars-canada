// Imports
const Sequelize = require('sequelize');
require('dotenv').config();

// Initialize Sequelize using JAWSDB_URL if available (used in cloud environments like Heroku),
// otherwise use local MySQL connection parameters from environment variables (DB_NAME, DB_USER, DB_PASSWORD).
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

// Test Connection
const testConnection = async () => {
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connet to the database:', err);
  }
};

testConnection();

// Exports
module.exports = sequelize;
