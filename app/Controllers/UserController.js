const User = require('../Models/user.model');

const UserController = {
  getUser(req, res) {
    User.findOne({
      _id: req.params.id
    }).then((user) => {
      res.send(user);
    }).catch((err) => {
      res.send(err);
    });
  },
  getAll(req, res) {
    User.find({})
      .then((users) => {
        res.send(users);
      }).catch((err) => {
        res.send(err);
      });
  },
};

module.exports = UserController;
