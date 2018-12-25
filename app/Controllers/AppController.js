const Joi = require('joi');
const App = require('../Models/app.model');
const AppValidator = require('../Validators/AppDataValidator');
const Service = require('../Services/makeRandomService');


const AppController = {
  createApp: function(req, res) {
    Joi.validate(req.body, AppValidator.addApp, (err, data) => {
      if (err) {
        res
          .status(401)
          .send({ error: err });
      } else {
        let newApp = {};
        newApp.app_name = data.app_name;
        newApp.query_url = data.query_url;
        newApp.secret_key = Service.make_random();
        newApp.user_id = req.auth._id;
        App.create(newApp).then(app => {
          res.send({ app: app });
        }).catch(err => {
          res
            .status(500)
            .send({ error: err });
        });
      }
    });
  },
  getApp: function(req, res) {
    App.findOne({
      _id: req.params.id
    }).populate('user_id').then(app => {
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
      res.send({ app: resApp });
    }).catch((err) => {
      res
        .status(500)
        .send(err);
    });
  }
};

module.exports = AppController;
