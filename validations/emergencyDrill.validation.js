const Joi = require("joi").defaults((schema) =>
  schema.options({
    allowUnknown: true,
  })
);

const toEmailSchema = {
  emergency_drill_id: Joi.required(),
  to_email_user_id: Joi.required(),
  to_email_user_name: Joi.required(),
  to_email_user_email: Joi.required(),
};

const attendenceSchema = {
  emergency_drill_id: Joi.required(),
  employee_type: Joi.optional(),
  employee_id: Joi.optional(),
  employee_name: Joi.required(),
  company_name: Joi.optional(),
  company_code: Joi.optional(),
  department_name: Joi.optional(),
  department_code: Joi.optional(),
  location_name: Joi.optional(),
  location_code: Joi.optional(),
  present: Joi.required(),
  out_of_office: Joi.required(),
};

const addEmergencyDrillValidationSchema = Joi.object()
  .keys({
    year_id: Joi.required(),
    month_id: Joi.required(),
    company_id: Joi.required(),
    type_id: Joi.required(),
    shift_date_time: Joi.required(),
    purpose: Joi.optional(),
    location_ids: Joi.array().min(1).required(),
  })
  .options({ allowUnknown: true });

const addNotificationValidationSchema = Joi.object()
  .keys({
    emergency_drill_id: Joi.required(),
    toEmailUsers: Joi.array()
      .items(
        Joi.object(toEmailSchema).options({
          allowUnknown: true,
        })
      )
      .required(),
  })
  .options({ allowUnknown: true });

const attendeceValidationSchema = Joi.object()
  .keys({
    emergency_drill_id: Joi.required(),
    attendence: Joi.array()
      .min(1)
      .items(
        Joi.object(attendenceSchema).options({
          allowUnknown: true,
        })
      )
      .required(),
  })
  .options({ allowUnknown: true });

const addAuditChecklistValidationSchema = Joi.object()
  .keys({
    audit_id: Joi.required(),
    process: Joi.required(),
    reference: Joi.required(),
    requirements: Joi.optional(),
  })
  .options({ allowUnknown: true });
const updateAuditChecklistValidationSchema = Joi.object()
  .keys({
    audit_id: Joi.required(),
    process: Joi.required(),
    reference: Joi.required(),
    requirements: Joi.optional(),
    audit_finding_id: Joi.required(),
    observations: Joi.optional(),
  })
  .options({ allowUnknown: true });

module.exports = {
  addEmergencyDrillValidationSchema,
  addNotificationValidationSchema,
  attendeceValidationSchema,
  //   addAuditChecklistValidationSchema,
  //   updateAuditChecklistValidationSchema,
};
