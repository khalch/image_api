const mongoose = require('mongoose');
const conn = require('./connection');

const apiConn = conn.apiConn;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // get: () => {},
  },
  access_token: {
    type: String,
    required: true,
    get: () => {}
  },
  query_count: {
    type: Number,
    default: 0
  }
});

module.exports = apiConn.model('User', UserSchema);
