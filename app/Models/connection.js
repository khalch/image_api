const mongoose = require('mongoose');

const conn = {
  userConn: mongoose.createConnection(process.env.DB_USER),
  appConn: mongoose.createConnection(process.env.DB_APP)
};

module.exports = conn;
