const Joi = require("joi");

const addAssessmentValidationSchema = Joi.object()
  .keys({
    company_id: Joi.required(),
    date_raised: Joi.string().required(),
    risk_type: Joi.string().required(),
    risk_area: Joi.string().required(),
    event: Joi.string().required(),
    cause: Joi.string().required(),
    consequences: Joi.string().required(),
    likelihood_id: Joi.required(),
    consequence_id: Joi.required(),
  })
  .options({ allowUnknown: true });

const updateAssessmentValidationSchema = Joi.object()
  .keys({
    action_id: Joi.required(),
    plan: Joi.string().required(),
    residual_likelihood_id: Joi.required(),
    residual_consequence_id: Joi.required(),
    methods: Joi.string().required(),
    progress_reporting: Joi.string().required(),
    responsible: Joi.string().required(),
  })
  .options({ allowUnknown: true });

module.exports = {
  addAssessmentValidationSchema,
  updateAssessmentValidationSchema,
};
