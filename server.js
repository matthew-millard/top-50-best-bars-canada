// Imports
const sequelize = require('./config/connection');
const express = require('express');
const path = require('path');

// Express Application
const app = express();

// Port
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Application is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`An error occurred while starting the server:`, err);
  }
};

startServer();
