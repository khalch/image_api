const redis = require('redis');
const User = require('../Models/user.model');
const App = require('../Models/app.model');
const client = require('../Models/redis');

const CronJob = require('cron').CronJob;

const job = new CronJob('0 */10 * * * *', () => {
  User.find({})
    .then((users) => {
      users.forEach((item) => {
        client.get(item._id.toString(), (err, data) => {
          if (err) {
            console.log(err);
          }
          if (data != null) {
            item.updateOne({ query_count: data }).then((user) => {
              console.log({ user});
            });
          } else {
            client.set(item._id.toString(), item.query_count.toString(), redis.print);
          }
        });
      });
    }).catch((err) => {
      console.log({ error: err });
    });
  App.find({})
    .then((app) => {
      app.forEach((item) => {
        client.get(item._id.toString(), (err, data) => {
          if (err) {
            console.log(err);
          }
          if (data != null) {
            item.updateOne({ query_count: data }).then((app) => {
              console.log({ app });
            });
          } else {
            client.set(item._id.toString(), item.query_count.toString(), redis.print);
          }
        });
      });
    }).catch((err) => {
	    console.log({ error: err });
    });
});
job.start();


module.exports = CronJob;
