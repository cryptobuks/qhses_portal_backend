const Joi = require("joi");

const addLocationValidationSchema = Joi.object()
  .keys({
    code: Joi.required(),
    name: Joi.required(),
    device_face_ids: Joi.array().items(Joi.number()),
  })
  .options({ allowUnknown: true });

module.exports = {
  addLocationValidationSchema,
};
