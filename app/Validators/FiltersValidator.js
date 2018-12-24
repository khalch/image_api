const Joi = require('joi');

const FiltersValidators = {
  filters: Joi.object().keys({
    resize: Joi.array(),
    scale: Joi.array(),
    crop: Joi.array(),
    flip: Joi.array(),
    mirror: Joi.array(),
    rotate: Joi.array(),
    brightness: Joi.array(),
    contrast: Joi.array(),
    dither565: Joi.array(),
    greyscale: Joi.array(),
    invert: Joi.array(),
    normalize: Joi.array(),
    blur: Joi.array(),
    posterize: Joi.array(),
    sepia: Joi.array(),
  }),

};
module.exports = FiltersValidators;
