const Joi = require("joi");

const registerRecordSchema = {
  legal_other_references: Joi.required(),
  activity: Joi.required(),
  legal_other_requirements: Joi.required(),
  reference_documents: Joi.required(),
  responsible: Joi.required(),
  remarks: Joi.optional(),
};

const addRegisterValidationSchema = Joi.object()
  .keys({
    year_id: Joi.required(),
    legal_other_references: Joi.required(),
    activity: Joi.required(),
    legal_other_requirements: Joi.required(),
    reference_documents: Joi.required(),
    responsible: Joi.required(),
    remarks: Joi.optional(),
  })
  .options({ allowUnknown: true });

const updateRegisterValidationSchema = Joi.object()
  .keys({
    register_record_id: Joi.required(),
    legal_other_references: Joi.required(),
    activity: Joi.required(),
    legal_other_requirements: Joi.required(),
    reference_documents: Joi.required(),
    responsible: Joi.required(),
    remarks: Joi.optional(),
  })
  .options({ allowUnknown: true });

const addRegisterRecordReviewValidationSchema = Joi.object()
  .keys({
    register_record_id: Joi.required(),
    quarter_id: Joi.required(),
    review_done: Joi.required(),
    remarks: Joi.optional(),
    expiry_date: Joi.optional(),
  })
  .options({ allowUnknown: true });

module.exports = {
  addRegisterValidationSchema,
  updateRegisterValidationSchema,
  addRegisterRecordReviewValidationSchema,
};
