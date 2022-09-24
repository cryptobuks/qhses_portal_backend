const Joi = require("joi");

const distributorsSchema = {
  user_id: Joi.number(),
  user_name: Joi.string().required(),
  user_email: Joi.string().required(),
  email_type: Joi.string(),
};

const actionPlanSchema = {
  responsible_user_id: Joi.required(),
  responsible_user_name: Joi.string().required(),
  responsible_user_email: Joi.string().required(),
  target_date: Joi.string().required(),
  description: Joi.string().required(),
};

const ncrRecordValidationSchema = Joi.object()
  .keys({
    owner_id: Joi.required(),
    company_id: Joi.required(),
    company_code: Joi.required(),
    department_id: Joi.required(),
    department_code: Joi.required(),
    // area_id: Joi.required(),
    // supplier: Joi.required(),
    category_id: Joi.required(),
    category_code: Joi.required(),
    source_id: Joi.required(),
    source_code: Joi.required(),
    description: Joi.string().required(),
    ncr_date: Joi.string().required(),
    nc_type_id: Joi.required(),
    management_system_id: Joi.required(),
    // distributors: Joi.array()
    //   .min(1)
    //   .items(Joi.object(distributorsSchema))
    //   .optional(),
  })
  .options({ allowUnknown: true });

const updateNcrRecordValidationSchema = Joi.object()
  .keys({
    ncr_record_id: Joi.required(),
    verification_effectiveness: Joi.optional(),
    closing_remarks: Joi.optional(),
    // distributors: Joi.array()
    //   .min(1)
    //   .items(Joi.object(distributorsSchema))
    //   .optional(),
    // correctivePlans: Joi.array()
    //   .min(1)
    //   .items(Joi.object(actionPlanSchema))
    //   .optional(),
  })
  .options({ allowUnknown: true });

const closingActionPlanValidationSchema = Joi.object()
  .keys({
    ncr_record_id: Joi.required(),
    action_plan_id: Joi.required(),
    closing_date: Joi.string().required(),
    closing_remarks: Joi.string().required(),
  })
  .options({ allowUnknown: true });

module.exports = {
  ncrRecordValidationSchema,
  updateNcrRecordValidationSchema,
  closingActionPlanValidationSchema,
};
