const redis = require('redis');
const User = require('../Models/user.model');
const App = require('../Models/app.model');
const client = require('../Models/redis');

const CounterMiddleware = {
  countQueries(req, res, next) {
    if (req.auth.user) {
      client.get(req.auth.user._id, (err, result) => {
        if (err) {
          res
            .status(500)
            .send({ error: err });
        }
        result++;
        client.set(req.auth.user._id, result, redis.print);
      });
      next();
    } else if (req.auth.app) {
      client.get(req.auth.app._id, (err, result) => {
        if (err) {
          res
            .status(500)
            .send({ error: err });
        }
        result++;
        client.set(req.auth.app._id, result, redis.print);
      });
      next();
    } else {
      res
        .status(500)
        .send('error');
    }
  },
};

module.exports = CounterMiddleware;
