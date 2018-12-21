const express = require('express');

const Router = express.Router();
const Limiter = require('express-rate-limiter');
const MemoryStore = require('express-rate-limiter/lib/memoryStore');
const parseFormdata = require('parse-formdata');
const fs = require('fs');
const Kernel = require('../app/Kernel');
const client = require('../app/Models/redis');

const limiter = new Limiter({ db: new MemoryStore() });
const request = require('request');

Router.get('/', (req, res) => {
  res.send('hello');
});


Router.post('/register', Kernel.Controllers.AuthController.register);
Router.post('/login', Kernel.Controllers.AuthController.login);


Router.get('/user/:id', Kernel.Middlewares.AuthMiddleware.auth_user, Kernel.Controllers.UserController.getUser);
Router.get('/users', Kernel.Middlewares.AuthMiddleware.auth_user, Kernel.Controllers.UserController.getAll);


Router.post('/app/create', Kernel.Middlewares.AuthMiddleware.auth_user, Kernel.Controllers.AppController.createApp);
Router.get('/app/:id', Kernel.Middlewares.AuthMiddleware.auth_user, Kernel.Controllers.AppController.getApp);

Router.post('/test', Kernel.Middlewares.AuthMiddleware.auth, limiter.middleware(), Kernel.Middlewares.CountMiddleware.countQueries, (req, res) => {
  client.get(req.auth.user._id, (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.send({ user: req.auth, queries: result });
  });
});

Router.post('/update/image', Kernel.Middlewares.AuthMiddleware.auth_user, Kernel.Controllers.ImageController.update_img);

Router.post('/remove', (req, res) => {
  fs.readdir('./public/5c08de3b12123500f8ef0c7a', (err, dirs) => {
    if (err) {
      res.send(err);
    } else {
      for (const dir of dirs) {
        fs.readdir(`./public/5c08de3b12123500f8ef0c7a/${dir}`, (err, files) => {
	        //   console.log({dir: dir, files: files});
	        // });
	        for (const file of files) {
		        fs.unlinkSync(`./public/5c08de3b12123500f8ef0c7a/${dir}/${file}`);
	        }
        });
          // fs.fs.rmdirSync(`./public/5c08de3b12123500f8ef0c7a/${dir}`);
        // });
      }
    }
	  // fs.rmdirSync(`./public/5c08de3b12123500f8ef0c7a`);
  });
});

module.exports = Router;
