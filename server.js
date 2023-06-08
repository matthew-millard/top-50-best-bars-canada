// Imports
const sequelize = require('./config/connection');
const express = require('express');
const path = require('path');
const routes = require('./controllers/index');
const exphbs = require('express-handlebars');

// Express Application
const app = express();

// Port
const PORT = process.env.PORT || 3001;

// Create instance of the express handlebars engine
const hbs = exphbs.create({ helpers: {} });

// Middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Start server
const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Application is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`An error occurred while starting the server:`, err);
  }
};

startServer();
