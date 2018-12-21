const mongoose = require('mongoose');
const conn = require('./connection');

const apiConn = conn.apiConn;
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
  query_url: {
    type: String,
    required: true
  },
  query_count: {
    type: Number,
    default: 0
  }
});

module.exports = apiConn.model('App', AppSchema);
