const Joi = require("joi");

const authValidationSchema = Joi.object().keys({
  token: Joi.required(),
});

module.exports = {
  authValidationSchema,
};
