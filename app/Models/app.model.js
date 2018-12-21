const mongoose = require('mongoose');
const conn = require('./connection');

const appConn = conn.appConn;
const User = require('./user.model');

const Schema = mongoose.Schema;

const AppSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: User
  },
  secret_key: {
    type: String,
    required: true,
    get: () => {}
  },
  app_name: {
    type: String,
    required: true
  },
  query_count: {
    type: Number,
    default: 0
  }
});

module.exports = appConn.model('App', AppSchema);