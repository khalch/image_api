const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../Models/user.model');
const UserValidator = require('../Validators/UserDataValidator');
const Service = require('../Services/services');

const AuthController = {
  register(req, res) {
    Joi.validate(req.body, UserValidator.registerSchema, (err, data) => {
      if (err) {
        res.send({ error: err });
      }
      const newUser = new User();
      bcrypt.hash(data.password, process.env.SALT_PASS, (err, hash) => {
        if (err) {
          res.send({ error: err });
        } else {
          bcrypt.hash({ data });
        }
        newUser.name = data.name;
        newUser.password = hash;
        newUser.email = data.email;
        newUser.access_token = Service.make_random();
        newUser.save((err, user) => {
          if (err) {
            res.send({ error: err });
          } else {
            res.send({ user });
            console.log(user);
          }
        });
      });
    });
  },
  login(req, res) {
    Joi.validate(req.body, UserValidator.loginSchema, (err, data) => {
      if (err) {
        res.send({ error: err });
      }
      bcrypt.hash(data.password, process.env.SALT_PASS, (err, hash) => {
        if (err) {
          res.send({ error: err });
        }
        User.findOne({
          email: data.email,
          password: hash
        }).then((user) => {
          res.send(user);
        }).catch((err) => {
          res.send(err);
        });
      });
    });
  },


};

module.exports = AuthController;
