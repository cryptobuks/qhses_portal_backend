const Joi = require("joi");

const addAssessmentValidationSchema = Joi.object()
  .keys({
    company_id: Joi.required(),
    company_code: Joi.required(),
    department_id: Joi.optional(),
    product_name: Joi.required(),
    process: Joi.required(),
    process_location: Joi.required(),
    risk_person_ids: Joi.required(),
    process_substance_and_manufacturer: Joi.required(),
    classification_ids: Joi.required(),
    hazard_type_ids: Joi.required(),
    exposure_route_ids: Joi.required(),
    workplace_exposure_limits: Joi.required(),
    health_surveillance_required: Joi.required(),
    health_risk_rating_id: Joi.required(),
    environment_risk_rating_id: Joi.required(),

    // protective_equipment_ids: Joi.array().min(1).items(Joi.number()),
    // first_aid_measures: Joi.required(),
    // storage: Joi.required(),
    // substance_disposal_type_ids: Joi.array().min(1).items(Joi.number()),
    // exposure_controlled: Joi.required(),
    // risk_rating_id: Joi.required(),
  })
  .options({ allowUnknown: true });

const updateAssessmentValidationSchema = Joi.object()
  .keys({
    assessment_id: Joi.required(),
    company_id: Joi.required(),
    company_code: Joi.required(),
    department_id: Joi.optional(),
    product_name: Joi.required(),
    process: Joi.required(),
    process_location: Joi.required(),
    // risk_person_ids: Joi.array().min(1).items(Joi.number()),
    risk_person_ids: Joi.required(),
    process_substance_and_manufacturer: Joi.required(),
    // classification_ids: Joi.array().min(1).items(Joi.number()),
    classification_ids: Joi.required(),
    // hazard_type_ids: Joi.array().min(1).items(Joi.number()),
    hazard_type_ids: Joi.required(),
    // exposure_route_ids: Joi.array().min(1).items(Joi.number()),
    exposure_route_ids: Joi.required(),
    workplace_exposure_limits: Joi.required(),
    health_surveillance_required: Joi.required(),
    health_risk_rating_id: Joi.required(),
    environment_risk_rating_id: Joi.required(),
  })
  .options({ allowUnknown: true });

module.exports = {
  addAssessmentValidationSchema,
  updateAssessmentValidationSchema,
};
