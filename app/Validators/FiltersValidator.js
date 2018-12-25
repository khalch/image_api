const Joi = require('joi');

const FiltersObjectValidator = Joi.object({
  apply: Joi.string().valid([
    'resize',
    'scale',
    'crop',
    'flip',
    'mirror',
    'rotate',
    'brightness',
    'contrast',
    'dither565',
    'greyscale',
    'invert',
    'normalize',
    'blur',
    'posterize',
    'sepia'
  ]),
  value: Joi.array().items(Joi.number())
});
const CaptureValidator = Joi.array().items(
  Joi.object().keys({
    name: Joi.string().required(),
    filters: Joi.array().items(FiltersObjectValidator)
  })
)
module.exports = CaptureValidator;
