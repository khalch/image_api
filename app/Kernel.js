const Kernel = {
  Controllers: {
    AuthController: require('./Controllers/AuthContoller'),
    AppController: require('./Controllers/AppController'),
    UserController: require('./Controllers/UserController'),
	  ImageController: require('./Controllers/ImageController')
  },
  Middlewares: {
    AuthMiddleware: require('./Middlewares/AuthMiddleware'),
    CountMiddleware: require('./Middlewares/CounterMiddleware')
  }
};

module.exports = Kernel;
