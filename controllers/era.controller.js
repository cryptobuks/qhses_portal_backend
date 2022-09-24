const Joi = require("joi");
const models = require("../models");
const createError = require("http-errors");
const moment = require("moment");
require("dotenv").config();

const {
  addAssessmentValidationSchema,
  updateAssessmentValidationSchema,
} = require("../validations/era.validation");
const { asyncForEach } = require("../helpers/asyncForEach");

const {
  User,
  Company,
  EraLikelihood,
  EraConsequence,
  EraAction,
  EraStatus,
  EraAssessment,
} = models;

const assessmentIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: User, as: "lastUpdateBy", attributes: { exclude: ["password"] } },
  { model: Company, as: "company" },
  { model: EraLikelihood, as: "likelihood" },
  { model: EraConsequence, as: "consequence" },
  { model: EraLikelihood, as: "residualLikelihood" },
  { model: EraConsequence, as: "residualConsequence" },
  { model: EraAction, as: "action" },
  { model: EraStatus, as: "status" },
];

getEraLikelihoods = async (req, res, next) => {
  try {
    const results = await EraLikelihood.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getEraConsequences = async (req, res, next) => {
  try {
    const results = await EraConsequence.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getEraActions = async (req, res, next) => {
  try {
    const results = await EraAction.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getEraStatuses = async (req, res, next) => {
  try {
    const results = await EraStatus.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

index = async (req, res, next) => {
  try {
    let limit = 2;
    let offset = 0 + (req.query.page - 1) * limit;
    const results = await EraAssessment.findAll({
      include: assessmentIncludes,
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

getAssessmentDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await EraAssessment.findOne({
      where: { id: id },
      include: assessmentIncludes,
    });
    res.send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

addRiskAssessment = async (req, res, next) => {
  try {
    await addAssessmentValidationSchema.validateAsync(req.body);
    req.body.user_id = req.currentUser.id;
    req.body.last_update_by_user_id = req.currentUser.id;
    const result = await EraAssessment.create(req.body);

    const assessment = await EraAssessment.findOne({
      where: { id: result.id },
      include: assessmentIncludes,
    });

    res.status(201).send({
      message: "Assessment created successfully.",
      data: assessment,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateAssessment = async (req, res, next) => {
  try {
    await updateAssessmentValidationSchema.validateAsync(req.body);
    const id = req.body.assessment_id;
    const assessmentExists = await EraAssessment.findOne({
      where: { id: id },
    });
    if (!assessmentExists) throw createError.BadRequest();
    req.body.last_update_by_user_id = req.currentUser.id;
    req.body.status_id = 2;
    await EraAssessment.update(req.body, {
      where: { id: id },
    });

    const assessment = await EraAssessment.findOne({
      where: { id: id },
      include: assessmentIncludes,
    });

    res.send({
      data: assessment,
      message: "Assessment added successfully!",
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

closeAssessment = async (req, res, next) => {
  try {
    const validationSchema = Joi.object().keys({
      assessment_id: Joi.required(),
    });
    await validationSchema.validateAsync(req.body);

    const id = req.body.assessment_id;
    const assessmentExists = await EraAssessment.findOne({
      where: { id: id },
    });
    if (!assessmentExists) throw createError.BadRequest();
    await EraAssessment.update(
      {
        status_id: 3,
      },
      {
        where: { id: id },
      }
    );

    const assessment = await EraAssessment.findOne({
      where: { id: id },
      include: assessmentIncludes,
    });

    res.send({
      data: assessment,
      message: "Assessment added successfully!",
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

module.exports = {
  getEraLikelihoods,
  getEraConsequences,
  getEraActions,
  getEraStatuses,
  index,
  getAssessmentDetail,
  addRiskAssessment,
  updateAssessment,
  closeAssessment,
};
