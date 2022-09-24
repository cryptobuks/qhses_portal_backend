const Joi = require("joi");

const applicationSchema = {
  application_id: Joi.required(),
  application_role_id: Joi.required(),
  application_menu_ids: Joi.array().items(Joi.number()),
};

const addUserValidationSchema = Joi.object()
  .keys({
    emp_id: Joi.required(),
    role_id: Joi.required(),
    applications: Joi.array()
      .min(1)
      .items(Joi.object(applicationSchema))
      .optional(),
    company_ids: Joi.array().items(Joi.number()),
  })
  .options({ allowUnknown: true });

const updateUserValidationSchema = Joi.object()
  .keys({
    id: Joi.required(),
    applications: Joi.array().items(Joi.object(applicationSchema)).optional(),
    applicationsToDelete: Joi.array()
      .items(Joi.object(applicationSchema))
      .optional(),
    company_ids: Joi.array().items(Joi.number()).optional(),
    companysToDelete: Joi.array().items(Joi.number()).optional(),
  })
  .options({ allowUnknown: true });

const userValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  designation: Joi.string().required(),
  department: Joi.string().required(),
});

const authValidationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  addUserValidationSchema,
  updateUserValidationSchema,
  userValidationSchema,
  authValidationSchema,
};
