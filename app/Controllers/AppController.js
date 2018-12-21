const Joi = require('joi');
const App = require('../Models/app.model');
const AppValidator = require('../Validators/AppDataValidator');
const Service = require('../Services/services');


const AppController = {
  createApp(req, res) {
    Joi.validate(req.body, AppValidator.addApp, (err, data) => {
      if (err) {
        res.send({ error: err });
      } else {
        const newApp = new App();
        newApp.app_name = data.app_name;
        newApp.secret_key = Service.make_random();
        newApp.user_id = req.auth._id;
        newApp.save((err, app) => {
          if (err) {
            res.send({ error: err });
          } else {
            res.send({ app });
            console.log(app);
          }
        });
      }
    });
  },
  getApp(req, res) {
    App.findOne({
      _id: req.params.id
    }).populate('user_id').then((app) => {
      const resApp = {
        _id: app._id,
        app_name: app.app_name,
        user_id: {
          query_count: app.user_id.query_count,
          user_name: app.user_id.user_name,
          _id: app.user_id._id,
          email: app.user_id.email,
        },
        query_count: app.query_count
      };
      res.send(resApp);
    }).catch((err) => {
      res.send(err);
    });
  }
};

module.exports = AppController;
