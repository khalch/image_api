const mongoose = require('mongoose');
const conn = require('./connection');

const apiConn = conn.apiConn;

const Schema = mongoose.Schema;

const AppSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  secret_key: {
    type: String,
    required: true,
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
