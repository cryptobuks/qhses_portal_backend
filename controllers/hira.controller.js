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
} = require("../validations/hira.validation");
const { asyncForEach } = require("../helpers/asyncForEach");

const {
  User,
  Company,
  HiraHazard,
  HiraProbability,
  HiraSeverity,
  HiraEntity,
  HiraRecord,
  HiraRecordAssessment,
  HiraRecordAssessmentEntity,
  HiraRecordAssessmentMeasurement,
} = models;

const assessmentIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: User, as: "lastUpdateBy", attributes: { exclude: ["password"] } },
  { model: HiraHazard, as: "hazard" },
  {
    model: HiraEntity,
    as: "entities",
  },
  { model: HiraProbability, as: "probability" },
  { model: HiraSeverity, as: "severity" },
  { model: HiraRecordAssessmentMeasurement, as: "measurements" },
  { model: HiraProbability, as: "residualProbability" },
  { model: HiraSeverity, as: "residualSeverity" },
];

const recordIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: User, as: "lastUpdateBy", attributes: { exclude: ["password"] } },
  { model: Company, as: "company" },
  {
    model: HiraRecordAssessment,
    as: "assessments",
    include: assessmentIncludes,
  },
];

getHiraProbabilities = async (req, res, next) => {
  try {
    const results = await HiraProbability.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getHiraSeverities = async (req, res, next) => {
  try {
    const results = await HiraSeverity.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getHiraEntities = async (req, res, next) => {
  try {
    const results = await HiraEntity.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getHiraHazards = async (req, res, next) => {
  try {
    const results = await HiraHazard.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
addHiraHazard = async (req, res, next) => {
  try {
    const validationSchema = Joi.object().keys({
      name: Joi.string().required(),
    });
    await validationSchema.validateAsync(req.body);
    const result = await HiraHazard.create(req.body);
    res.status(201).send({
      message: "Hazard created successfully.",
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
    const results = await HiraRecord.findAll({
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
    var hira_number = "";
    const code = req.body.company_code;
    hira_number += `${code.toUpperCase()}-HSE-RA-${moment(req.body.date).format(
      "YYYY"
    )}`;

    const idLength = 7;
    const latestActivity = await HiraRecord.findOne({
      order: [["createdAt", "DESC"]],
    });
    const activityId = latestActivity ? latestActivity.id + 1 : 1;
    const paddedActivityId = activityId.toString().padStart(idLength, "0");
    hira_number += `-${paddedActivityId}`;
    req.body.hira_number = hira_number;
    req.body.user_id = req.currentUser.id;
    req.body.last_update_by_user_id = req.currentUser.id;
    const result = await HiraRecord.create(req.body);

    const record = await HiraRecord.findOne({
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
    const data = await HiraRecord.findOne({
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
    const recordExists = await HiraRecord.findOne({
      where: { id: id },
    });
    if (!recordExists) throw createError.BadRequest();
    req.body.user_id = req.currentUser.id;
    req.body.last_update_by_user_id = req.currentUser.id;
    const assessment = await HiraRecordAssessment.create(req.body);

    await asyncForEach(req.body.entity_ids, async (id) => {
      await HiraRecordAssessmentEntity.create({
        record_id: recordExists.id,
        record_assessment_id: assessment.id,
        entity_id: id,
      });
    });

    const record = await HiraRecord.findOne({
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
    const recordExists = await HiraRecord.findOne({
      where: { id: id },
    });
    if (!recordExists) throw createError.BadRequest();
    await HiraRecordAssessmentMeasurement.create(req.body);

    const record = await HiraRecord.findOne({
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
    const recordExists = await HiraRecord.findOne({
      where: { id: id },
    });
    if (!recordExists) throw createError.BadRequest();
    req.body.last_update_by_user_id = req.currentUser.id;
    // await HiraRecordAssessment.create(req.body);
    await HiraRecordAssessment.update(req.body, {
      where: { id: assessmentId },
    });

    const record = await HiraRecord.findOne({
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
  getHiraProbabilities,
  getHiraSeverities,
  getHiraEntities,
  getHiraHazards,
  addHiraHazard,
  index,
  addRecord,
  getRecordDetail,
  addAssessment,
  addMeasurement,
  updateAssessment,
};
