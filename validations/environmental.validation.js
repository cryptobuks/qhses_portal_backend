const Joi = require("joi");

const addRecordValidationSchema = Joi.object()
  .keys({
    company_id: Joi.required(),
    company_code: Joi.required(),
    revision_number: Joi.string().required(),
    date: Joi.string().required(),
  })
  .options({ allowUnknown: true });

const addAssessmentValidationSchema = Joi.object()
  .keys({
    record_id: Joi.required(),
    activity_id: Joi.required(),
    aspect: Joi.required(),
    impact: Joi.required(),
    probability_id: Joi.required(),
    severity_id: Joi.required(),
  })
  .options({ allowUnknown: true });

const addMeasurementValidationSchema = Joi.object()
  .keys({
    record_id: Joi.required(),
    record_assessment_id: Joi.required(),
    measurement: Joi.required(),
  })
  .options({ allowUnknown: true });

const updateAssessmentValidationSchema = Joi.object()
  .keys({
    record_id: Joi.required(),
    activity_id: Joi.required(),
    aspect: Joi.required(),
    impact: Joi.required(),
    probability_id: Joi.required(),
    severity_id: Joi.required(),
    residual_probability_id: Joi.required(),
    residual_severity_id: Joi.required(),
  })
  .options({ allowUnknown: true });

module.exports = {
  addRecordValidationSchema,
  addAssessmentValidationSchema,
  addMeasurementValidationSchema,
  updateAssessmentValidationSchema,
};
