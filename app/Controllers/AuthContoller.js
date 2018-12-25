const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../Models/user.model');
const UserValidator = require('../Validators/UserDataValidator');
const Service = require('../Services/makeRandomService');
const mongoose = require('mongoose');

const AuthController = {
  register(req, res) {
    Joi.validate(req.body, UserValidator.registerSchema, (err, data) => {
      if (err) {
        res
          .status(401)
          .send({ error: err });
      }
      bcrypt.hash(data.password, process.env.SALT_PASS, (err, hash) => {
        if (err) {
          res
            .status(500)
            .send({error: err});
        }
        let newUser = {};
        newUser._id = new mongoose.Types.ObjectId();
        newUser.name = data.name;
        newUser.password = hash;
        newUser.email = data.email;
        newUser.query_url = data.query_url;
        newUser.access_token = Service.make_random();
        User.create(newUser).then(user => {
          res.send({ user: user });
        }).catch(err => {
          res
            .status(500)
            .send({ error: err });
        });
      });
    });
  },
  login(req, res) {
    Joi.validate(req.body, UserValidator.loginSchema, (err, data) => {
      if (err) {
        res
          .status(401)
          .send({ error: err });
      } else {
        User.findOne({
          email: data.email,
        }).then((user) => {
          let match = bcrypt.compareSync(req.body.password, user.password);
          if (match) {
            res.send({user: user});
          } else {
            res
              .status(401)
              .send('wrong password');
          }
        }).catch((err) => {
          res
            .status(500)
            .send({ error: err });
        });
      }
    });
  },


};

module.exports = AuthController;
