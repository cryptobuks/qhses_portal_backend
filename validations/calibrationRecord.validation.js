const Joi = require("joi");

const recordValidationSchema = Joi.object()
  .keys({
    equipment_asset_number: Joi.required(),
    instrument_description: Joi.string().required(),
    referance_standard: Joi.string().required(),
    manufacturer: Joi.required(),
    instrument_serial_number: Joi.required(),
    range: Joi.required(),
    accuracy: Joi.required(),
    calibration_frequency_id: Joi.required(),
    calibration_date: Joi.required(),
    calibration_due_date: Joi.required(),
    certificate_number: Joi.required(),
    certification_attachment: Joi.required(),
    remarks: Joi.string().optional(),
  })
  .options({ allowUnknown: true });

const updateRecordValidationSchema = Joi.object()
  .keys({
    calibration_date: Joi.required(),
    calibration_due_date: Joi.required(),
    certificate_number: Joi.required(),
    certification_attachment: Joi.required(),
    remarks: Joi.string().optional(),
  })
  .options({ allowUnknown: true });

module.exports = {
  recordValidationSchema,
  updateRecordValidationSchema,
};
