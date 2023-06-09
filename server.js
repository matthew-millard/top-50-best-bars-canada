// Imports
const sequelize = require('./config/connection');
const session = require('express-session');
const express = require('express');
const path = require('path');
const routes = require('./controllers/index');
const exphbs = require('express-handlebars');
require('dotenv').config();

// Helper functions
const removeProtocol = require('./utils/removeProtocol');
const formatDate = require('./utils/formatDate');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Express Application
const app = express();

// Port
const PORT = process.env.PORT || 3001;

// Create instance of the express handlebars engine
const hbs = exphbs.create({
  helpers: {
    removeProtocol: removeProtocol,
    formatDate: formatDate,
    eq: function (a, b) {
      return a === b;
    },
  },
});

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 300000, // 5 mins
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

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
