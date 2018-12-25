const express = require('express');
const Router = express.Router();
const Limiter = require('express-rate-limiter');
const MemoryStore = require('express-rate-limiter/lib/memoryStore');
const Kernel = require('../app/Kernel');
const limiter = new Limiter({ db: new MemoryStore() });
const Joi = require('joi');
const FiltersValidator = require('../app/Validators/FiltersValidator');

Router.get('/', (req, res) => {
  res.send('hello');
});


Router.post('/register', Kernel.Controllers.AuthController.register);
Router.post('/login', Kernel.Controllers.AuthController.login);


Router.get('/user/:id', Kernel.Middlewares.AuthMiddleware.auth_by_user, Kernel.Controllers.UserController.getUser);
Router.get('/users', Kernel.Middlewares.AuthMiddleware.auth_by_user, Kernel.Controllers.UserController.getAll);


Router.post('/app/create', Kernel.Middlewares.AuthMiddleware.auth_by_user, Kernel.Controllers.AppController.createApp);
Router.get('/app/:id', Kernel.Middlewares.AuthMiddleware.auth_by_user, Kernel.Controllers.AppController.getApp);

Router.post('/update/image', Kernel.Middlewares.AuthMiddleware.auth, limiter.middleware(), Kernel.Middlewares.CountMiddleware.countQueries, Kernel.Controllers.ImageController.update_img);


module.exports = Router;
