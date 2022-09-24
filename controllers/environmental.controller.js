const Joi = require("joi");
const models = require("../models");
const createError = require("http-errors");
const moment = require("moment");
require("dotenv").config();

const {
  addRecordValidationSchema,
  addAssessmentValidationSchema,
  addMeasurementValidationSchema,
  updateAssessmentValidationSchema,
} = require("../validations/environmental.validation");

const {
  User,
  Company,
  EnvironmentalActivity,
  EnvironmentalProbability,
  EnvironmentalSeverity,
  EnvironmentalRecord,
  EnvironmentalRecordAssessment,
  EnvironmentalRecordAssessmentMeasurement,
} = models;

const assessmentIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: User, as: "lastUpdateBy", attributes: { exclude: ["password"] } },
  { model: EnvironmentalActivity, as: "activity" },
  { model: EnvironmentalProbability, as: "probability" },
  { model: EnvironmentalSeverity, as: "severity" },
  { model: EnvironmentalRecordAssessmentMeasurement, as: "measurements" },
  { model: EnvironmentalProbability, as: "residualProbability" },
  { model: EnvironmentalSeverity, as: "residualSeverity" },
];

const recordIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: User, as: "lastUpdateBy", attributes: { exclude: ["password"] } },
  { model: Company, as: "company" },
  {
    model: EnvironmentalRecordAssessment,
    as: "assessments",
    include: assessmentIncludes,
  },
];

getEnvironmentalProbabilities = async (req, res, next) => {
  try {
    const results = await EnvironmentalProbability.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getEnvironmentalSeverities = async (req, res, next) => {
  try {
    const results = await EnvironmentalSeverity.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getEnvironmentalActivities = async (req, res, next) => {
  try {
    const results = await EnvironmentalActivity.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
addEnvironmentalActivity = async (req, res, next) => {
  try {
    const validationSchema = Joi.object().keys({
      name: Joi.string().required(),
    });
    await validationSchema.validateAsync(req.body);
    const result = await EnvironmentalActivity.create(req.body);
    res.status(201).send({
      message: "Activity created successfully.",
      data: result,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

index = async (req, res, next) => {
  try {
    let limit = 2;
    let offset = 0 + (req.query.page - 1) * limit;
    const results = await EnvironmentalRecord.findAll({
      include: recordIncludes,
      // limit: limit,
      // offset: offset,
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

addRecord = async (req, res, next) => {
  try {
    await addRecordValidationSchema.validateAsync(req.body);
    var eair_number = "";
    const code = req.body.company_code;
    eair_number += `${code.toUpperCase()}-EAIR-${moment(req.body.date).format(
      "YYYY"
    )}`;

    const idLength = 7;
    const latestActivity = await EnvironmentalRecord.findOne({
      order: [["createdAt", "DESC"]],
    });
    const activityId = latestActivity ? latestActivity.id + 1 : 1;
    const paddedActivityId = activityId.toString().padStart(idLength, "0");
    eair_number += `-${paddedActivityId}`;
    req.body.eair_number = eair_number;
    req.body.user_id = req.currentUser.id;
    req.body.last_update_by_user_id = req.currentUser.id;
    const result = await EnvironmentalRecord.create(req.body);

    const record = await EnvironmentalRecord.findOne({
      where: { id: result.id },
      include: recordIncludes,
    });

    res.status(201).send({
      message: "Record created successfully.",
      data: record,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

getRecordDetail = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await EnvironmentalRecord.findOne({
      where: { id: id },
      include: recordIncludes,
    });
    if (!data) throw createError.NotFound();
    res.send({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

addAssessment = async (req, res, next) => {
  try {
    await addAssessmentValidationSchema.validateAsync(req.body);
    const id = req.params.id;
    const recordExists = await EnvironmentalRecord.findOne({
      where: { id: id },
    });
    if (!recordExists) throw createError.BadRequest();
    req.body.user_id = req.currentUser.id;
    req.body.last_update_by_user_id = req.currentUser.id;
    await EnvironmentalRecordAssessment.create(req.body);

    const record = await EnvironmentalRecord.findOne({
      where: { id: id },
      include: recordIncludes,
    });

    res.send({
      data: record,
      message: "Assessment added successfully!",
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};
addMeasurement = async (req, res, next) => {
  try {
    await addMeasurementValidationSchema.validateAsync(req.body);
    const id = req.params.recordId;
    const assessmentId = req.params.assessmentId;
    const recordExists = await EnvironmentalRecord.findOne({
      where: { id: id },
    });
    if (!recordExists) throw createError.BadRequest();
    await EnvironmentalRecordAssessmentMeasurement.create(req.body);

    const record = await EnvironmentalRecord.findOne({
      where: { id: id },
      include: recordIncludes,
    });

    res.send({
      data: record,
      message: "Measurement added successfully!",
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateAssessment = async (req, res, next) => {
  try {
    await updateAssessmentValidationSchema.validateAsync(req.body);
    const id = req.params.recordId;
    const assessmentId = req.params.assessmentId;
    const recordExists = await EnvironmentalRecord.findOne({
      where: { id: id },
    });
    if (!recordExists) throw createError.BadRequest();
    req.body.last_update_by_user_id = req.currentUser.id;
    // await EnvironmentalRecordAssessment.create(req.body);
    await EnvironmentalRecordAssessment.update(req.body, {
      where: { id: assessmentId },
    });

    const record = await EnvironmentalRecord.findOne({
      where: { id: id },
      include: recordIncludes,
    });

    res.send({
      data: record,
      message: "Assessment added successfully!",
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

module.exports = {
  getEnvironmentalProbabilities,
  getEnvironmentalSeverities,
  getEnvironmentalActivities,
  addEnvironmentalActivity,
  index,
  addRecord,
  getRecordDetail,
  addAssessment,
  addMeasurement,
  updateAssessment,
};
