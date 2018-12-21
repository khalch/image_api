const mongoose = require('mongoose');

const conn = {
  apiConn: mongoose.createConnection(process.env.DB_API),
};

module.exports = conn;
