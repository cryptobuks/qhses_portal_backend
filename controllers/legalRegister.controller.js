const Joi = require("joi");
const models = require("../models");
const { Op } = require("sequelize");
const createError = require("http-errors");
const moment = require("moment");
require("dotenv").config();

const {
  addRegisterValidationSchema,
  updateRegisterValidationSchema,
  addRegisterRecordReviewValidationSchema,
} = require("../validations/legalRegister.validation");
const { asyncForEach } = require("../helpers/asyncForEach");

const {
  User,
  Year,
  Quater,
  LegalRegister,
  LegalRegisterRecord,
  LegalRegisterRecordReview,
} = models;

const reviewsInclude = [{ model: Quater, as: "quarter" }];

const registerRecordsInclude = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  {
    model: User,
    as: "lastUpdateBy",
    attributes: { exclude: ["password"] },
  },
  {
    model: Year,
    as: "year",
  },
  {
    model: LegalRegisterRecordReview,
    as: "reviews",
    include: reviewsInclude,
  },
];

index = async (req, res, next) => {
  try {
    let limit = 2;
    let offset = 0 + (req.query.page - 1) * limit;
    const yearId = req.query.year_id;
    var whereClause = {};
    if (yearId) {
      whereClause["year_id"] = {
        [Op.eq]: yearId,
      };
    }
    const results = await LegalRegisterRecord.findAll({
      where: whereClause,
      include: registerRecordsInclude,
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

getRegisterRecordDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await LegalRegisterRecord.findOne({
      where: { id: id },
      include: registerRecordsInclude,
    });
    res.send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

addLegalRegisterRecord = async (req, res, next) => {
  try {
    await addRegisterValidationSchema.validateAsync(req.body);
    req.body.user_id = req.currentUser.id;
    req.body.last_update_by_user_id = req.currentUser.id;

    const result = await LegalRegisterRecord.create(req.body);
    const registerRecord = await LegalRegisterRecord.findOne({
      where: { id: result.id },
      include: registerRecordsInclude,
    });

    res.status(201).send({
      message: "Register created successfully.",
      data: registerRecord,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateLegalRegisterRecord = async (req, res, next) => {
  try {
    await updateRegisterValidationSchema.validateAsync(req.body);
    const registerId = req.body.register_id;
    const registerExists = await LegalRegisterRecord.findOne({
      where: { id: registerId },
    });
    if (!registerExists) throw createError.BadRequest();

    // await LegalRegisterRecord.bulkCreate(req.body);

    const registerRecord = await LegalRegisterRecord.findOne({
      where: { id: registerId },
      include: registerRecordsInclude,
    });

    res.send({
      data: registerRecord,
      message: "Register updated successfully!",
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

addLegalRegisterRecordQuarterReview = async (req, res, next) => {
  try {
    await addRegisterRecordReviewValidationSchema.validateAsync(req.body);
    const registerRecordId = req.body.register_record_id;

    const registerRecordExists = await LegalRegisterRecord.findOne({
      where: { id: registerRecordId },
    });
    if (!registerRecordExists) throw createError.BadRequest();

    await LegalRegisterRecordReview.create(req.body);

    const registerRecord = await LegalRegisterRecord.findOne({
      where: { id: registerRecordId },
      include: registerRecordsInclude,
    });

    res.send({
      data: registerRecord,
      message: "Register Record Review added successfully!",
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

module.exports = {
  index,
  getRegisterRecordDetail,
  addLegalRegisterRecord,
  updateLegalRegisterRecord,
  addLegalRegisterRecordQuarterReview,
};
