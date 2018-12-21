const User = require('../Models/user.model');

const UserController = {
  getUser(req, res) {
    User.findOne({
      _id: req.params.id
    }).then(user => {
      res.send({ user: user });
    }).catch((err) => {
      res
        .status(500)
        .send(err);
    });
  },
  getAll(req, res) {
    User.find({})
      .then(users => {
        res.send({ users: users });
      }).catch((err) => {
        res
          .status(500)
          .send(err);
      });
  },
};

module.exports = UserController;
