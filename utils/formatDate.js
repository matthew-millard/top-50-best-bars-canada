// Import the moment.js library
const moment = require('moment');

// Format the date
const formatDate = (date) => {
  return moment(date).format('DD-MM-YYYY');
};

// Exports
module.exports = formatDate;
