const Joi = require('joi');

const AppDataValidator = {

  addApp: Joi.object().keys({
    app_name: Joi.string().alphanum().min(3).max(30)
      .required(),
  }),

};
module.exports = AppDataValidator;
