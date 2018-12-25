const mongoose = require('mongoose');
const conn = require('./connection');
const App = require('./app.model');
const apiConn = conn.apiConn;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
  },
  access_token: {
    type: String,
    required: true,
  },
  query_count: {
    type: Number,
    default: 0
  },

});

module.exports = apiConn.model('User', UserSchema);
