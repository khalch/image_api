const redis = require('redis');
const User = require('../Models/user.model');
const App = require('../Models/app.model');
const client = require('../Models/redis');

const AuthMiddleware = {
  auth_by_user: function (req, res, next) {
    if ('authorization' in req.headers) {
      const bearer = req.headers.authorization;
      const access_token = bearer.replace('Bearer ', '');
      User.findOne({
        access_token
      }).then((user) => {

        client.get(user._id, (err, result) => {
          if (err) {
            res.send({error: err});
          }
          if (result === null) {
            client.set(user._id, user.query_count, redis.print);
          }
          req.auth = {user};
          next();
        });
      }).catch((err) => {
        res
          .status(401)
          .send({message: 'unauthorized'});
      });
    } else {
      res
        .status(401)
        .send({message: 'unauthorized'});
    }
  },
  auth_by_app: function (req, res, next) {
    if ((req.query.public_key) && (req.query.secret_key)) {
      App.findOne({
        _id: req.query.public_key,
        secret_key: req.query.secret_key
      }).then((app) => {
        client.get(app._id, (err, result) => {
          if (err) {
            res.send(err);
          }
          if (result == null) {
            client.set(app._id, app.query_count, redis.print);
          }
          req.auth = {app};
          next();
        });
      }).catch((err) => {
        res
          .status(401)
          .send({message: 'unauthorized'});
      });
    } else {
      res
        .status(401)
        .send({message: 'unauthorized'});
    }
  }
};

module.exports = AuthMiddleware;
