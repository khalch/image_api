const Joi = require('joi');

const AppDataValidator = {

  addApp: Joi.object().keys({
    app_name: Joi.string().min(3).max(30).required(),
    query_url: Joi.string().required()
  }),

};
module.exports = AppDataValidator;
