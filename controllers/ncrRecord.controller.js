const Joi = require("joi");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const models = require("../models");
const createError = require("http-errors");
const moment = require("moment");
require("dotenv").config();
const {
  ncrRecordValidationSchema,
  updateNcrRecordValidationSchema,
  closingActionPlanValidationSchema,
} = require("../validations/ncrRecord.validation");
const {
  ncrCreatedTemplate,
  ncrOwnerTemplate,
  actionPlanAddedTemplateToCreator,
  actionPlanAddedTemplateToOwer,
  actionPlanAddedTemplateToResponsible,
  distributorTemplate,
  actionPlanClosedTemplateToCreator,
  actionPlanClosedTemplateToOwner,
  actionPlanOverDueTemplate,
  actionPlanDaysTemplate,
  ncrReviseTemplateToOwner,
} = require("../helpers/email_template");
const { response } = require("express");

const {
  sequelize,
  User,
  NcrRecord,
  Company,
  Department,
  NcrArea,
  NcrSource,
  NcrCategory,
  NcrNCType,
  NcrManagementSystem,
  FindingType,
  NcrDistributor,
  NcrStatus,
  NcrCorrectiveActionPlan,
  NcrRecordHistory,
  EmailMessage,
  NcrRecordDocument,
} = models;

const recordIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: User, as: "owner", attributes: { exclude: ["password"] } },
  { model: NcrArea, as: "area" },
  { model: NcrCategory, as: "category" },
  { model: NcrSource, as: "source" },
  { model: NcrStatus, as: "status" },
  { model: NcrNCType, as: "ncType" },
  { model: NcrManagementSystem, as: "managementSystem" },
  { model: FindingType, as: "findingType" },
  {
    model: NcrRecordDocument,
    as: "documents",
    include: [
      { model: User, as: "uploadedBy", attributes: { exclude: ["password"] } },
    ],
  },
  {
    model: NcrDistributor,
    as: "distributors",
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
    ],
  },
  {
    model: NcrCorrectiveActionPlan,
    as: "correctiveActionPlans",
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
      {
        model: NcrRecordDocument,
        as: "documents",
        include: [
          {
            model: User,
            as: "uploadedBy",
            attributes: { exclude: ["password"] },
          },
        ],
      },
    ],
  },
];

index = async (req, res, next) => {
  let limit = 10;
  let offset = 0 + (req.query.page - 1) * limit;
  const ownerId = req.query.owner_id;
  const departmentId = req.query.department_id;
  const sourceId = req.query.source_id;
  const statusId = req.query.status_id;
  const findingTypeId = req.query.finding_type_id;
  try {
    var whereClause = {};
    // const userRole = req.currentUser.role.title;
    // if (userRole == "USER") {
    //   whereClause = {
    //     [Op.or]: [
    //       { user_id: req.currentUser.id },
    //       { owner_id: req.currentUser.id },
    //       {
    //         "$distributors.user_id$": req.currentUser.id,
    //       },
    //       {
    //         "$correctiveActionPlans.responsible_user_id$": req.currentUser.id,
    //       },
    //     ],
    //   };
    // } else if (userRole == "HSE_COORDINATOR") {
    //   whereClause = {};
    // }
    if (ownerId) {
      whereClause["owner_id"] = {
        [Op.eq]: ownerId,
      };
    }
    if (departmentId) {
      whereClause["department_id"] = {
        [Op.eq]: departmentId,
      };
    }
    if (sourceId) {
      whereClause["source_id"] = {
        [Op.eq]: sourceId,
      };
    }
    if (statusId) {
      whereClause["status_id"] = {
        [Op.eq]: statusId,
      };
    }
    if (findingTypeId) {
      whereClause["finding_type_id"] = {
        [Op.eq]: findingTypeId,
      };
    }
    const results = await NcrRecord.findAll({
      where: whereClause,
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
    await ncrRecordValidationSchema.validateAsync(req.body);
    if (req.body.distributors) {
      req.body.distributors = JSON.parse(req.body.distributors);
    }
    var ncr_number = "";
    ncr_number += `${req.body.company_code.toUpperCase()}/${req.body.source_code.toUpperCase()}/${req.body.category_code.toUpperCase()}/${moment(
      req.body.ncr_date
    ).format("YYYY-MM")}/${req.body.department_code.toUpperCase()}`;

    const idLength = 7;
    const latestRecord = await NcrRecord.findOne({
      order: [["createdAt", "DESC"]],
    });
    const recordId = latestRecord ? latestRecord.id + 1 : 1;
    const paddedRecordId = recordId.toString().padStart(idLength, "0");
    ncr_number += `/${paddedRecordId}`;
    req.body.user_id = req.currentUser.id;
    req.body.ncr_number = ncr_number;
    const result = await NcrRecord.create(req.body, {
      include: [
        {
          model: NcrDistributor,
          as: "distributors",
        },
      ],
    });

    await NcrRecordHistory.create({
      record_id: result.id,
      user_id: req.currentUser.id,
      status_id: 1,
    });

    /**
     * Upload Documents
     */
    if (req.files && req.files.length) {
      const docObj = req.files.map((file) => {
        return {
          ncr_record_id: result.id,
          uploaded_by: req.currentUser.id,
          document_name: file.filename,
        };
      });
      await NcrRecordDocument.bulkCreate(docObj);
    }
    /**
     * Upload Documents End
     */

    const record = await NcrRecord.findOne({
      where: { id: result.id },
      include: recordIncludes,
    });

    let emailMessages = [];

    /**
     * NCR Created EMAIL
     */
    emailMessages.push({
      msg_to: record.user.email,
      msg_subject: "NCR Created",
      msgbody: ncrCreatedTemplate(
        record.user.name,
        `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
      ),
    });
    /**
     * END NCR Created EMAIL
     */

    /**
     * NCR Owner EMAIL
     */
    emailMessages.push({
      msg_to: record.owner.email,
      msg_subject: "New NCR Assigned",
      msgbody: ncrOwnerTemplate(
        record.owner.name,
        `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
      ),
    });
    /**
     * END NCR Owner EMAIL
     */

    if (record.distributors && record.distributors.length) {
      record.distributors.forEach((distributor) => {
        const email = distributor.user.email;
        const email_type = distributor.email_type;
        const subject = "Added as Distributor in NCR";
        const body = distributorTemplate(
          distributor.user.name,
          `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
        );
        var msgObj = {
          msg_subject: subject,
          msgbody: body,
        };
        msgObj["msg_to"] = email;
        // if (email_type.toLowerCase() === "to") {
        // msgObj["msg_to"] = email;
        // } else {
        //   msgObj["msg_cc"] = email;
        // }
        emailMessages.push(msgObj);
      });
    }
    if (emailMessages.length > 0) {
      emailMessages.forEach(async (emailMessage) => {
        const result = await sequelize.query(
          `InsertEmailAlerts  @msg_to = '${emailMessage.msg_to}', @msg_cc = '${
            emailMessage.msg_cc ? emailMessage.msg_cc : ""
          }', @msg_subject = '${emailMessage.msg_subject}', @msg_body = '${
            emailMessage.msgbody
          }', @is_send = 0, @emailtype = ncr;`
        );
      });
      // await EmailMessage.bulkCreate(emailMessages);
    }

    res.status(201).send({
      message: "data created successfully.",
      data: record,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateRecord = async (req, res, next) => {
  try {
    await updateNcrRecordValidationSchema.validateAsync(req.body);
    let ncrUpdateObj = {};
    if (req.body.distributors) {
      req.body.distributors = JSON.parse(req.body.distributors);
    }
    if (req.body.correctivePlans) {
      req.body.correctivePlans = JSON.parse(req.body.correctivePlans);
    }
    const record = await NcrRecord.findOne({
      where: { id: req.body.ncr_record_id },
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { model: User, as: "owner", attributes: { exclude: ["password"] } },
      ],
    });

    if (
      !(
        record &&
        (record.owner_id === req.currentUser.id ||
          record.user_id === req.currentUser.id)
      )
    )
      throw createError.BadRequest();

    /**
     * Upload Documents
     */
    if (req.files && req.files.length) {
      const docObj = req.files.map((file) => {
        return {
          ncr_record_id: record.id,
          uploaded_by: req.currentUser.id,
          document_name: file.filename,
        };
      });
      await NcrRecordDocument.bulkCreate(docObj);
    }
    /**
     * Upload Documents End
     */

    if (
      req.body.root_cause !== null &&
      record.owner_id === req.currentUser.id
    ) {
      ncrUpdateObj["root_cause"] = req.body.root_cause;
    }
    if (
      req.body.correction_action !== null &&
      record.owner_id === req.currentUser.id
    ) {
      ncrUpdateObj["correction_action"] = req.body.correction_action;
    }

    /**
     * Update Record on Draft Status
     */

    if (record.status_id === 8 && record.user_id === req.currentUser.id) {
      ncrUpdateObj["company_id"] = req.body.company_id;
      ncrUpdateObj["department_id"] = req.body.department_id;
      ncrUpdateObj["owner_id"] = req.body.owner_id;
      ncrUpdateObj["supplier"] = req.body.supplier;
      ncrUpdateObj["category_id"] = req.body.category_id;
      ncrUpdateObj["nc_type_id"] = req.body.nc_type_id;
      ncrUpdateObj["management_system_id"] = req.body.management_system_id;
      ncrUpdateObj["source_id"] = req.body.source_id;
      ncrUpdateObj["description"] = req.body.description;
      ncrUpdateObj["status_id"] = 1;
    }
    /**
     * Update Record on Draft Status End
     */

    if (ncrUpdateObj) {
      await NcrRecord.update(ncrUpdateObj, {
        where: { id: req.body.ncr_record_id },
      });
      if (ncrUpdateObj.status_id) {
        await NcrRecordHistory.create({
          record_id: req.body.ncr_record_id,
          user_id: req.currentUser.id,
          status_id: ncrUpdateObj.status_id,
        });
      }
    }

    let emailMessages = [];
    if (
      record.status_id == 5 &&
      record.user_id === req.currentUser.id &&
      req.body.verification_effectiveness != null
    ) {
      await NcrRecord.update(
        {
          verification_effectiveness: req.body.verification_effectiveness,
          closing_remarks: req.body.closing_remarks
            ? req.body.closing_remarks
            : "",
          status_id: req.body.verification_effectiveness == "true" ? 6 : 7,
        },
        {
          where: { id: req.body.ncr_record_id },
        }
      );
      await NcrRecordHistory.create({
        record_id: req.body.ncr_record_id,
        user_id: req.currentUser.id,
        status_id: req.body.verification_effectiveness == "true" ? 6 : 7,
      });
      if (req.body.verification_effectiveness != "true") {
        emailMessages.push({
          msg_to: record.owner.email,
          msg_cc: record.user.email,
          msg_subject: "NCR Revise and Resubmit",
          msgbody: ncrReviseTemplateToOwner(
            record.owner.name,
            `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
          ),
        });
      }
    }
    if (req.body.correctivePlans && req.body.correctivePlans.length) {
      const plansNewObject = req.body.correctivePlans.map((plan) => {
        const date1 = new Date(record.ncr_date);
        const date2 = new Date(plan.target_date);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return {
          ...plan,
          ncr_record_id: req.body.ncr_record_id,
          days: diffDays,
          status: "OPEN",
        };
      });
      await NcrCorrectiveActionPlan.bulkCreate(plansNewObject);
      if (record.status_id === 1 || record.status_id === 7) {
        await NcrRecord.update(
          { status_id: 2 },
          {
            where: { id: req.body.ncr_record_id },
          }
        );
        await NcrRecordHistory.create({
          record_id: req.body.ncr_record_id,
          user_id: req.currentUser.id,
          status_id: 2,
        });
      }

      /**
       * NCR Created EMAIL
       */
      emailMessages.push({
        msg_to: record.user.email,
        msg_subject: "Action Plan Added",
        msgbody: actionPlanAddedTemplateToCreator(
          record.user.name,
          `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
        ),
      });
      /**
       * END NCR Created EMAIL
       */
      /**
       * NCR Owner EMAIL
       */
      emailMessages.push({
        msg_to: record.owner.email,
        msg_subject: "Action Plan Added",
        msgbody: actionPlanAddedTemplateToOwer(
          record.owner.name,
          `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
        ),
      });
      /**
       * END NCR Owner EMAIL
       */
      if (req.body.correctivePlans && req.body.correctivePlans.length) {
        req.body.correctivePlans.forEach(async (actionPlan) => {
          const email = actionPlan.responsible_user_email;
          const subject = "Responsible Person in NCR";
          const body = actionPlanAddedTemplateToResponsible(
            actionPlan.responsible_user_name,
            `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
          );
          emailMessages.push({
            msg_to: email,
            msg_subject: subject,
            msgbody: body,
          });
        });
      }
    }
    if (req.body.distributors && req.body.distributors.length) {
      const distributorNewObj = req.body.distributors.map((distributor) => {
        return {
          ...distributor,
          ncr_record_id: req.body.ncr_record_id,
        };
      });
      await NcrDistributor.bulkCreate(distributorNewObj);

      req.body.distributors.forEach(async (distributor) => {
        const email = distributor.user_email;
        const email_type = distributor.email_type;
        const subject = "Added as Distributor in NCR";
        const body = distributorTemplate(
          distributor.user_name,
          `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
        );
        var msgObj = {
          msg_subject: subject,
          msgbody: body,
        };
        msgObj["msg_to"] = email;
        // if (email_type.toLowerCase() === "to") {
        //   msgObj["msg_to"] = email;
        // } else {
        //   msgObj["msg_cc"] = email;
        // }
        emailMessages.push(msgObj);
      });
    }
    if (emailMessages.length > 0) {
      emailMessages.forEach(async (emailMessage) => {
        const result = await sequelize.query(
          `InsertEmailAlerts  @msg_to = '${emailMessage.msg_to}', @msg_cc = '${
            emailMessage.msg_cc ? emailMessage.msg_cc : ""
          }', @msg_subject = '${emailMessage.msg_subject}', @msg_body = '${
            emailMessage.msgbody
          }', @is_send = 0, @emailtype = ncr;`
        );
      });
      // await EmailMessage.bulkCreate(emailMessages);
    }
    const data = await NcrRecord.findOne({
      where: { id: req.body.ncr_record_id },
      include: recordIncludes,
    });
    res.send({
      data: data,
      message: "Data update successfully!",
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateActionPlan = async (req, res, next) => {
  try {
    await closingActionPlanValidationSchema.validateAsync(req.body);
    let emailMessages = [];
    const record = await NcrRecord.findOne({
      where: { id: req.body.ncr_record_id },
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { model: User, as: "owner", attributes: { exclude: ["password"] } },
      ],
    });
    const actionPlan = await NcrCorrectiveActionPlan.findOne({
      where: { id: req.body.action_plan_id },
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
      ],
    });
    // console.log(!(actionPlan && actionPlan.user.id == req.currentUser.id));
    // res.send(actionPlan);
    // return;
    // if (!(actionPlan && actionPlan.user.id == req.currentUser.id))
    // throw createError.BadRequest();
    req.body.status = "CLOSED";
    const result = await NcrCorrectiveActionPlan.update(req.body, {
      where: { id: req.body.action_plan_id },
    });

    /**
     * Upload Documents
     */
    if (req.files && req.files.length) {
      const docObj = req.files.map((file) => {
        return {
          ncr_corrective_action_plan_id: req.body.action_plan_id,
          uploaded_by: req.currentUser.id,
          document_name: file.filename,
        };
      });
      await NcrRecordDocument.bulkCreate(docObj);
    }
    /**
     * Upload Documents End
     */

    if (record.status_id === 2) {
      await NcrRecord.update(
        { status_id: 3 },
        {
          where: { id: req.body.ncr_record_id },
        }
      );
      await NcrRecordHistory.create({
        record_id: req.body.ncr_record_id,
        user_id: req.currentUser.id,
        status_id: 3,
      });
    }
    /**
     * Check All Action Plans STATUS
     */
    const actionPlans = await NcrCorrectiveActionPlan.findAll({
      where: { status: "OPEN", ncr_record_id: req.body.ncr_record_id },
    });
    if (!actionPlans.length) {
      await NcrRecord.update(
        { status_id: 5 },
        {
          where: { id: req.body.ncr_record_id },
        }
      );
      await NcrRecordHistory.create({
        record_id: req.body.ncr_record_id,
        user_id: 0,
        status_id: 5,
      });
    }
    /**
     * End check All Action Plans STATUS
     */

    /**
     * NCR Creater EMAIL on Action Plan Closed
     */
    const body = actionPlanClosedTemplateToCreator(
      record.user.name,
      `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
    );
    emailMessages.push({
      msg_to: record.user.email,
      msg_subject: "Action Plan Closed",
      msgbody: body,
    });
    /**
     * END NCR Creater EMAIL on Action Plan Closed
     */

    /**
     * NCR Owner email on action plan closed
     */
    const bodyOwner = actionPlanClosedTemplateToOwner(
      record.owner.name,
      `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
    );
    emailMessages.push({
      msg_to: record.owner.email,
      msg_subject: "Action Plan Closed",
      msgbody: bodyOwner,
    });
    /**
     * End NCR Owner email on action plan closed
     */
    if (emailMessages.length > 0) {
      emailMessages.forEach(async (emailMessage) => {
        const result = await sequelize.query(
          `InsertEmailAlerts  @msg_to = '${emailMessage.msg_to}', @msg_cc = '${
            emailMessage.msg_cc ? emailMessage.msg_cc : ""
          }', @msg_subject = '${emailMessage.msg_subject}', @msg_body = '${
            emailMessage.msgbody
          }', @is_send = 0, @emailtype = ncr;`
        );
      });
      // await EmailMessage.bulkCreate(emailMessages);
    }
    if (result == 0) throw createError.BadRequest();
    const data = await NcrRecord.findOne({
      where: { id: req.body.ncr_record_id },
      include: recordIncludes,
    });
    res.send({
      message: "Record updated successfully.",
      data: data,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateClosedOutDate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validationSchema = Joi.object().keys({
      closed_out_date: Joi.string().required(),
    });
    const updatePost = {
      closed_out_date: req.body.closed_out_date,
    };
    await validationSchema.validateAsync(updatePost);
    const result = await NcrRecord.update(updatePost, {
      where: { id: id },
    });
    if (result == 0) throw createError.BadRequest();
    const data = await NcrRecord.findOne({
      where: { id: id },
      include: recordIncludes,
    });
    res.send({
      message: "Record updated successfully.",
      data: data,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateRemarks = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validationSchema = Joi.object().keys({
      remarks: Joi.string().required(),
    });
    const updatePost = {
      remarks: req.body.remarks,
    };
    await validationSchema.validateAsync(updatePost);
    const result = await NcrRecord.update(updatePost, {
      where: { id: id },
    });
    if (result == 0) throw createError.BadRequest();
    const data = await NcrRecord.findOne({
      where: { id: id },
      include: recordIncludes,
    });
    res.send({
      message: "Remarks updated successfully.",
      data: data,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateVerification = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validationSchema = Joi.object().keys({
      verification_effectiveness: Joi.required(),
    });
    const updatePost = {
      verification_effectiveness: req.body.verification_effectiveness,
    };
    await validationSchema.validateAsync(updatePost);
    const result = await NcrRecord.update(updatePost, {
      where: { id: id },
    });
    if (result == 0) throw createError.BadRequest();
    const record = await NcrRecord.findOne({
      where: { id: id },
      include: recordIncludes,
    });
    if (record.status_id === 5) {
      await NcrRecord.update(
        { status_id: 6 },
        {
          where: { id: record.id },
        }
      );
      await NcrRecordHistory.create({
        record_id: record.id,
        user_id: req.currentUser.id,
        status_id: 6,
      });
    }
    const data = await NcrRecord.findOne({
      where: { id: id },
      include: recordIncludes,
    });
    res.send({
      message: "Verification updated successfully.",
      data: data,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validationSchema = Joi.object().keys({
      status: Joi.required(),
    });
    const updatePost = {
      status: req.body.status,
    };
    await validationSchema.validateAsync(updatePost);
    const result = await NcrRecord.update(updatePost, {
      where: { id: id },
    });
    if (result == 0) throw createError.BadRequest();
    const data = await NcrRecord.findOne({
      where: { id: id },
      include: recordIncludes,
    });
    res.send({
      message: "Status updated successfully.",
      data: data,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

show = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await NcrRecord.findOne({
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

update = async (req, res, next) => {
  const id = req.params.id;
  const userId = 1;
  const updatePost = {
    category_id: req.body.category_id,
    title: req.body.title,
    content: req.body.content,
  };
  try {
    const result = await NcrRecord.update(updatePost, {
      where: { id: id, user_id: userId },
    });
    if (result == 0) throw createError.BadRequest();
    res.send({
      message: "data updated successfully.",
      data: updatePost,
    });
  } catch (error) {
    next(error);
  }
};

destroy = async (req, res, next) => {
  const id = req.params.id;
  const userId = 1;
  try {
    const result = await Record.destroy({
      where: { id: id, user_id: userId },
    });
    if (result == 0) throw createError.BadRequest();
    res.send({
      message: "data deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

checkActionPlansTargetDate = async (req, res, next) => {
  try {
    var currentDate = moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD");
    const actionPlans = await NcrCorrectiveActionPlan.findAll({
      where: { status: "OPEN" },
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
      ],
    });

    actionPlans.forEach(async (plan) => {
      if (plan.target_date) {
        const planTargetDate = moment(
          moment(plan.target_date).format("YYYY-MM-DD"),
          "YYYY-MM-DD"
        );
        const days = moment.duration(planTargetDate.diff(currentDate)).asDays();
        if (days < 0) {
          const record = await NcrRecord.findOne({
            where: { id: plan.ncr_record_id },
            include: recordIncludes,
          });
          if (record.status_id === 2 || record.status_id === 3) {
            await NcrRecord.update(
              { status_id: 4 },
              {
                where: { id: plan.ncr_record_id },
              }
            );
            await NcrRecordHistory.create({
              record_id: plan.ncr_record_id,
              user_id: 0,
              status_id: 4,
            });
          }
          //Send Overdue Email
          const body = actionPlanOverDueTemplate(
            plan.user.name,
            planTargetDate,
            `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
          );
          emailObj = {
            msg_to: plan.user.email,
            msg_subject: "Action Plan Overdue",
            msgbody: body,
          };
          const result = await sequelize.query(
            `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
              emailObj.msg_cc ? emailObj.msg_cc : ""
            }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
              emailObj.msgbody
            }', @is_send = 0, @emailtype = ncr;`
          );
          // await EmailMessage.create(emailObj);
        } else if (days <= 6) {
          const record = await NcrRecord.findOne({
            where: { id: plan.ncr_record_id },
            include: recordIncludes,
          });
          //Send Daily Email to responsible person
          const body = actionPlanDaysTemplate(
            plan.user.name,
            planTargetDate,
            days,
            `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
          );
          emailObj = {
            msg_to: plan.user.email,
            msg_subject: "NCR Action Plan",
            msgbody: body,
          };
          const result = await sequelize.query(
            `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
              emailObj.msg_cc ? emailObj.msg_cc : ""
            }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
              emailObj.msgbody
            }', @is_send = 0, @emailtype = ncr;`
          );
          // await EmailMessage.create(emailObj);
        } else if (days <= 7) {
          const record = await NcrRecord.findOne({
            where: { id: plan.ncr_record_id },
            include: recordIncludes,
          });
          //Send Weeakly Email to responsible person
          const body = actionPlanDaysTemplate(
            plan.user.name,
            planTargetDate,
            days,
            `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
          );
          emailObj = {
            msg_to: plan.user.email,
            msg_subject: "NCR Action Plan",
            msgbody: body,
          };
          const result = await sequelize.query(
            `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
              emailObj.msg_cc ? emailObj.msg_cc : ""
            }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
              emailObj.msgbody
            }', @is_send = 0, @emailtype = ncr;`
          );
          // await EmailMessage.create(emailObj);
        } else if (days <= 31) {
          const record = await NcrRecord.findOne({
            where: { id: plan.ncr_record_id },
            include: recordIncludes,
          });
          //Send Monthly Email to responsible person
          const body = actionPlanDaysTemplate(
            plan.user.name,
            planTargetDate,
            days,
            `${process.env.FRONTEND_BASE_URL}/ncr/records/edit/${record.id}`
          );
          emailObj = {
            msg_to: plan.user.email,
            msg_subject: "NCR Action Plan",
            msgbody: body,
          };
          const result = await sequelize.query(
            `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
              emailObj.msg_cc ? emailObj.msg_cc : ""
            }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
              emailObj.msgbody
            }', @is_send = 0, @emailtype = ncr;`
          );
          // await EmailMessage.create(emailObj);
        } else {
          // res.send("Everything is fine.");
        }
      }
    });
    res.send({
      message: "Request processed!",
      data: actionPlans,
    });
  } catch (error) {
    next(error);
  }
};

getAllRecords = async (req, res, next) => {
  try {
    const results = await NcrRecord.findAll({
      include: recordIncludes,
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  addRecord,
  updateRecord,
  updateActionPlan,
  show,
  update,
  destroy,
  updateClosedOutDate,
  updateRemarks,
  updateVerification,
  updateStatus,
  checkActionPlansTargetDate,
  getAllRecords,
};
