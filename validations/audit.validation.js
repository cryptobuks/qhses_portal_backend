const Joi = require("joi").defaults((schema) =>
  schema.options({
    allowUnknown: true,
  })
);

const auditorSchema = {
  audit_id: Joi.required(),
  auditor_user_id: Joi.required(),
  auditor_user_name: Joi.required(),
  auditor_user_email: Joi.required(),
};
const auditeeSchema = {
  audit_id: Joi.required(),
  auditee_user_id: Joi.required(),
  auditee_user_name: Joi.required(),
  auditee_user_email: Joi.required(),
};
const toEmailSchema = {
  audit_id: Joi.required(),
  to_email_user_id: Joi.required(),
  to_email_user_name: Joi.required(),
  to_email_user_email: Joi.required(),
};

const auditCheckListSchema = {
  audit_finding_id: Joi.required(),
  process: Joi.required(),
  reference: Joi.required(),
  requirements: Joi.required(),
  observations: Joi.required(),
};

const addAuditValidationSchema = Joi.object()
  .keys({
    year_id: Joi.required(),
    month_id: Joi.required(),
    audit_for: Joi.required(),
    company_id: Joi.optional(),
    department_id: Joi.optional(),
    company_code: Joi.optional(),
    department_code: Joi.optional(),
  })
  .options({ allowUnknown: true });

const addAuditNotificationValidationSchema = Joi.object()
  .keys({
    audit_id: Joi.required(),
    scope_of_audit: Joi.required(),
    reference_documents: Joi.required(),
    auditors: Joi.required(),
    auditees: Joi.required(),
    toEmailUsers: Joi.required(),
    // auditors: Joi.array()
    //   .min(1)
    //   .items(
    //     Joi.object(auditorSchema).options({
    //       allowUnknown: true,
    //     })
    //   )
    //   .required(),
    // auditees: Joi.array()
    //   .min(1)
    //   .items(
    //     Joi.object(auditeeSchema).options({
    //       allowUnknown: true,
    //     })
    //   )
    //   .required(),
    // toEmailUsers: Joi.array()
    //   .items(
    //     Joi.object(toEmailSchema).options({
    //       allowUnknown: true,
    //     })
    //   )
    //   .required(),
  })
  .options({ allowUnknown: true });

// const addAuditChecklistValidationSchema = Joi.object()
//   .keys({
//     audit_id: Joi.required(),
//     checklist: Joi.array()
//       .min(1)
//       .items(
//         Joi.object(auditCheckListSchema).options({
//           allowUnknown: true,
//         })
//       )
//       .required(),
//   })
//   .options({ allowUnknown: true });

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
  addAuditValidationSchema,
  addAuditNotificationValidationSchema,
  addAuditChecklistValidationSchema,
  updateAuditChecklistValidationSchema,
};
