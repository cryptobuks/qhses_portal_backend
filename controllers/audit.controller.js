require("dotenv").config();
const Joi = require("joi");
const { Op } = require("sequelize");
const createError = require("http-errors");
const moment = require("moment");
const models = require("../models");
const {
  addAuditValidationSchema,
  addAuditNotificationValidationSchema,
  addAuditChecklistValidationSchema,
  updateAuditChecklistValidationSchema,
} = require("../validations/audit.validation");
const { asyncForEach } = require("../helpers/asyncForEach");
const {
  auditCreatedTemplate,
  auditAuditorTemplate,
  auditAuditeeTemplate,
  auditCreatorReminderTemplate,
  auditCreatorOverDueReminderTemplate,
} = require("../helpers/email_template");

const {
  sequelize,
  User,
  Year,
  Month,
  Quater,
  Company,
  Department,
  NcrCategory,
  NcrSource,
  UserCompany,
  Audit,
  AuditStatus,
  AuditNotification,
  AuditNotificationAuditee,
  AuditNotificationAuditor,
  AuditNotificationToEmail,
  AuditNotificationReferenceDocument,
  AuditChecklist,
  AuditFinding,
  FindingType,
  NcrRecord,
  NcrRecordHistory,
} = models;

const auditNotificationInclude = [
  {
    model: AuditNotificationAuditor,
    as: "auditors",
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
    ],
  },
  {
    model: AuditNotificationAuditee,
    as: "auditees",
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
    ],
  },
  {
    model: AuditNotificationToEmail,
    as: "toEmailUsers",
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
    ],
  },
  {
    model: AuditNotificationReferenceDocument,
    as: "referenceDocuments",
  },
];

const auditIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: Year, as: "year" },
  { model: Month, as: "month" },
  { model: Company, as: "company" },
  { model: Department, as: "department" },
  {
    model: AuditNotification,
    as: "notification",
    include: auditNotificationInclude,
  },
  {
    model: AuditChecklist,
    as: "checklist",
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
      {
        model: AuditFinding,
        as: "finding",
        include: [{ model: FindingType, as: "type" }],
      },
    ],
  },
  { model: AuditStatus, as: "status" },
];

index = async (req, res, next) => {
  try {
    let limit = 10;
    let offset = 0 + (req.query.page - 1) * limit;
    const yearId = req.query.year_id;
    const statusId = req.query.status_id;
    var whereClause = {};
    if (yearId) {
      whereClause["year_id"] = {
        [Op.eq]: yearId,
      };
    }
    if (statusId) {
      whereClause["audit_status_id"] = {
        [Op.eq]: statusId,
      };
    }
    const results = await Audit.findAll({
      where: whereClause,
      include: auditIncludes,
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getAuditById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const audit = await Audit.findOne({
      where: { id: id },
      include: auditIncludes,
    });
    res.send({
      data: audit,
    });
  } catch (error) {
    next(error);
  }
};

addAudit = async (req, res, next) => {
  try {
    await addAuditValidationSchema.validateAsync(req.body);
    const userId = req.currentUser.id;

    var audit_number = "";
    const code = req.body.company_code
      ? req.body.company_code
      : req.body.department_code;
    audit_number += `ASH-IA-${code.toUpperCase()}`;

    const idLength = 7;
    const latestAudit = await Audit.findOne({
      order: [["createdAt", "DESC"]],
    });
    const auditId = latestAudit ? latestAudit.id + 1 : 1;
    const paddedAuditId = auditId.toString().padStart(idLength, "0");
    audit_number += `-${paddedAuditId}`;
    req.body.audit_number = audit_number;
    req.body.user_id = userId;

    const createdAudit = await Audit.create(req.body);

    const auditRes = await Audit.findOne({
      where: { id: createdAudit.id },
      include: auditIncludes,
    });

    const emailMessage = {
      msg_to: auditRes.user.email,
      msg_subject: "Audit Created",
      msgbody: auditCreatedTemplate(
        auditRes.user.name,
        auditRes,
        `${process.env.FRONTEND_BASE_URL}/internal-audit/${auditRes.id}/report`
      ),
    };
    await sequelize.query(
      `InsertEmailAlerts  @msg_to = '${emailMessage.msg_to}', @msg_cc = '${
        emailMessage.msg_cc ? emailMessage.msg_cc : ""
      }', @msg_subject = '${emailMessage.msg_subject}', @msg_body = '${
        emailMessage.msgbody
      }', @is_send = 0, @emailtype = internal_audit;`
    );
    res.send({
      data: auditRes,
    });
  } catch (error) {
    next(error);
  }
};

updateAudit = async (req, res, next) => {
  try {
    const auditId = req.body.audit_id;
    const userId = req.currentUser.id;
    await Audit.update(req.body, {
      where: { id: auditId },
    });

    const auditRes = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });

    res.send({
      data: auditRes,
    });
  } catch (error) {
    next(error);
  }
};

addAuditNotification = async (req, res, next) => {
  try {
    await addAuditNotificationValidationSchema.validateAsync(req.body);
    const auditId = req.body.audit_id;
    const userId = req.currentUser.id;
    req.body.user_id = userId;

    const auditExists = await Audit.findOne({
      where: { id: auditId },
      include: [
        {
          model: AuditNotification,
          as: "notification",
        },
      ],
    });

    if (!auditExists) throw createError.NotFound("Audit Not Found!");
    if (auditExists.notification)
      throw createError.BadRequest(
        "Notification Already Added Against this Audit!"
      );

    req.body.auditors = JSON.parse(req.body.auditors);
    req.body.auditees = JSON.parse(req.body.auditees);
    req.body.toEmailUsers = JSON.parse(req.body.toEmailUsers);

    const createdNotification = await AuditNotification.create(req.body, {
      include: [
        { model: AuditNotificationAuditor, as: "auditors" },
        { model: AuditNotificationAuditee, as: "auditees" },
        { model: AuditNotificationToEmail, as: "toEmailUsers" },
      ],
    });

    /**
     * Upload Documents
     */
    if (req.files && req.files.length) {
      const docObj = req.files.map((file) => {
        return {
          audit_id: auditId,
          audit_notification_id: createdNotification.id,
          document_name: file.filename,
        };
      });
      await AuditNotificationReferenceDocument.bulkCreate(docObj);
    }
    /**
     * Upload Documents End
     */

    await Audit.update(
      { audit_status_id: 2 },
      {
        where: { id: auditId },
      }
    );

    const auditRes = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });

    let emailMessages = [];
    if (auditRes.notification && auditRes.notification.auditors) {
      await asyncForEach(auditRes.notification.auditors, async (auditor) => {
        const email = auditor.user.email;
        const subject = "Internal Audit";
        const body = auditAuditorTemplate(
          auditor.user.name,
          auditRes,
          `${process.env.FRONTEND_BASE_URL}/internal-audit/${auditRes.id}/report`
        );
        var msgObj = {
          msg_subject: subject,
          msgbody: body,
          msg_to: email,
        };
        emailMessages.push(msgObj);
      });
    }
    if (auditRes.notification && auditRes.notification.auditees) {
      var ccEmails = "";
      if (auditRes.notification.toEmailUsers.length) {
        await asyncForEach(
          auditRes.notification.toEmailUsers,
          async (toEmailUser) => {
            ccEmails += `${toEmailUser.user.email},`;
          }
        );
      }
      await asyncForEach(auditRes.notification.auditees, async (auditee) => {
        const email = auditee.user.email;
        const subject = "Internal Audit";
        const body = auditAuditeeTemplate(
          auditee.user.name,
          auditRes,
          `${process.env.FRONTEND_BASE_URL}/internal-audit/${auditRes.id}/report`
        );
        var msgObj = {
          msg_subject: subject,
          msgbody: body,
          msg_to: email,
          msg_cc: ccEmails,
        };
        emailMessages.push(msgObj);
      });
    }
    if (emailMessages && emailMessages.length > 0) {
      emailMessages.forEach(async (emailMessage) => {
        const result = await sequelize.query(
          `InsertEmailAlerts  @msg_to = '${emailMessage.msg_to}', @msg_cc = '${
            emailMessage.msg_cc ? emailMessage.msg_cc : ""
          }', @msg_subject = '${emailMessage.msg_subject}', @msg_body = '${
            emailMessage.msgbody
          }', @is_send = 0, @emailtype = internal_audit;`
        );
      });
    }

    res.send({
      data: auditRes,
    });
  } catch (error) {
    next(error);
  }
};

addAuditChecklist = async (req, res, next) => {
  try {
    await addAuditChecklistValidationSchema.validateAsync(req.body);
    const auditId = req.body.audit_id;
    const userId = req.currentUser.id;
    req.body.user_id = userId;
    const audit = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    if (!audit) throw createError.NotFound("Audit Not Found!");
    if (!audit.notification)
      throw createError.BadRequest(
        "Notification does not exists, please add notification first!"
      );
    await AuditChecklist.create(req.body);
    if (audit.audit_status_id == 2) {
      await Audit.update(
        { audit_status_id: 3 },
        {
          where: { id: auditId },
        }
      );
    }
    const auditRes = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    res.send({
      data: auditRes,
    });
  } catch (error) {
    next(error);
  }
};

updateAuditChecklist = async (req, res, next) => {
  try {
    await updateAuditChecklistValidationSchema.validateAsync(req.body);
    const auditChecklistId = req.params.auditChecklistId;
    const auditId = req.params.auditId;
    const userId = req.currentUser.id;
    const audit = await Audit.findOne({
      where: { id: auditId },
    });
    if (!audit) throw createError.NotFound("Audit Not Found!");

    await AuditChecklist.update(req.body, {
      where: { id: auditChecklistId },
    });
    const auditRes = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    res.send({
      data: auditRes,
    });
  } catch (error) {
    next(error);
  }
};

deleteAuditChecklist = async (req, res, next) => {
  const auditChecklistId = req.params.auditChecklistId;
  const auditId = req.params.auditId;
  const userId = req.currentUser.id;
  try {
    const audit = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    if (!audit) throw createError.NotFound("Audit Not Found!");
    const result = await AuditChecklist.destroy({
      where: { id: auditChecklistId, audit_id: audit.id },
    });
    if (result == 0) throw createError.BadRequest();
    if (audit.checklist.length == 1) {
      await Audit.update(
        { audit_status_id: 2 },
        {
          where: { id: auditId },
        }
      );
    }
    const auditRes = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    res.send({
      data: auditRes,
    });
  } catch (error) {
    next(error);
  }
};

submitAuditChecklist = async (req, res, next) => {
  try {
    if (!req.body.audit_id)
      throw createError.BadRequest("Audit Id is required!");
    const auditId = req.body.audit_id;
    const userId = req.currentUser.id;
    const audit = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    if (!audit) throw createError.NotFound("Audit Not Found!");

    await asyncForEach(audit.checklist, async (checklistItem) => {
      let createdNcrId = null;
      if (checklistItem.finding && !checklistItem.submitted) {
        if (checklistItem.finding.create_ncr) {
          const company = audit.company_id
            ? await Company.findOne({
                where: { id: audit.company_id },
              })
            : await Company.findOne({
                where: { code: "ASH" },
              });
          const department = audit.department_id
            ? await Department.findOne({
                where: { id: audit.department_id },
              })
            : await Department.findOne({
                where: { code: "GEN" },
              });

          const category = await NcrCategory.findOne({
            where: { code: "CAR" },
          });
          const ncrSource = await NcrSource.findOne({
            where: { id: 1, code: "INT" },
          });
          const currentDate = moment().format("YYYY-MM-DD");

          var ncr_number = "";
          ncr_number += `${company.code.toUpperCase()}/${ncrSource.code.toUpperCase()}/${category.code.toUpperCase()}/${moment().format(
            "YYYY-MM"
          )}/${department.code.toUpperCase()}`;
          const idLength = 7;
          const latestRecord = await NcrRecord.findOne({
            order: [["createdAt", "DESC"]],
          });
          const recordId = latestRecord ? latestRecord.id + 1 : 1;
          const paddedRecordId = recordId.toString().padStart(idLength, "0");
          ncr_number += `/${paddedRecordId}`;

          const ncrObj = {
            ncr_number: ncr_number,
            user_id: userId,
            company_id: company.id,
            department_id: department.id,
            category_id: category.id,
            source_id: ncrSource.id,
            ncr_date: currentDate,
            finding_type_id: checklistItem.finding.type_id,
            description: checklistItem.observations,
            status_id: 8,
          };
          const createdNcrRes = await NcrRecord.create(ncrObj);
          createdNcrId = createdNcrRes.id;
          await NcrRecordHistory.create({
            record_id: createdNcrId,
            user_id: ncrObj.user_id,
            status_id: ncrObj.status_id,
          });
        }
        await AuditChecklist.update(
          {
            submitted: true,
            ncr_record_id: createdNcrId,
          },
          {
            where: { id: checklistItem.id },
          }
        );
      }
    });

    const auditRes = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    res.send({
      data: auditRes,
    });
  } catch (error) {
    next(error);
  }
};

completeAudit = async (req, res, next) => {
  try {
    if (!req.body.audit_id)
      throw createError.BadRequest("Audit Id is required!");
    const auditId = req.body.audit_id;
    const userId = req.currentUser.id;
    const audit = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    if (!audit) throw createError.NotFound("Audit Not Found!");

    await Audit.update(
      {
        audit_status_id: 4,
      },
      {
        where: { id: auditId },
      }
    );
    const auditRes = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    res.send({
      data: auditRes,
    });
  } catch (error) {
    next(error);
  }
};

copyAuditChecklist = async (req, res, next) => {
  try {
    const validationSchema = Joi.object().keys({
      audit_id: Joi.required(),
      copy_audit_id: Joi.required(),
    });
    await validationSchema.validateAsync(req.body);
    const auditId = req.body.audit_id;
    const copyAuditId = req.body.copy_audit_id;
    const userId = req.currentUser.id;
    const audit = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    const copyAudit = await Audit.findOne({
      where: { id: copyAuditId },
      include: auditIncludes,
    });
    if (!audit) throw createError.NotFound("Audit Not Found!");
    if (!copyAudit) throw createError.NotFound("Audit Not Found!");

    let copyChecklist = [];
    await asyncForEach(copyAudit.checklist, async (checklist) => {
      copyChecklist.push({
        user_id: userId,
        audit_id: auditId,
        process: checklist.process,
        reference: checklist.reference,
        requirements: checklist.requirements,
      });
    });

    await AuditChecklist.bulkCreate(copyChecklist);
    if (audit.audit_status_id == 2) {
      await Audit.update(
        { audit_status_id: 3 },
        {
          where: { id: auditId },
        }
      );
    }
    const auditRes = await Audit.findOne({
      where: { id: auditId },
      include: auditIncludes,
    });
    res.send({
      data: auditRes,
    });
  } catch (error) {
    next(error);
  }
};

sendAuditReminder = async (req, res, next) => {
  const currentYear = moment().format("YYYY");
  const currentMonth = moment().format("MM");
  const currentDate = moment().format("YYYY-MM-DD");
  var momentCurrentDate = moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD");
  try {
    const audits = await Audit.findAll({
      where: { audit_status_id: { [Op.ne]: 4 } },
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { model: Year, as: "year", where: { year: currentYear } },
        { model: Month, as: "month", where: { id: 1 } },
        { model: Company, as: "company" },
        { model: Department, as: "department" },
        {
          model: AuditNotification,
          as: "notification",
          include: auditNotificationInclude,
        },
        {
          model: AuditChecklist,
          as: "checklist",
          include: [
            { model: User, as: "user", attributes: { exclude: ["password"] } },
            {
              model: AuditFinding,
              as: "finding",
              include: [{ model: FindingType, as: "type" }],
            },
          ],
        },
        { model: AuditStatus, as: "status" },
      ],
    });

    let emailMessages = [];
    await asyncForEach(audits, async (audit) => {
      if (audit.notification) {
        const auditToDate = moment(
          moment(audit.notification.audit_to_date).format("YYYY-MM-DD"),
          "YYYY-MM-DD"
        );
        const daysDiff = moment
          .duration(auditToDate.diff(momentCurrentDate))
          .asDays();
        if (daysDiff < 0) {
          await Audit.update(
            { audit_status_id: 5 },
            {
              where: { id: audit.id },
            }
          );
        }
      }
      if (!audit.reminder_sent) {
        //Send Reminder
        const auditToDate = moment(
          moment(audit.notification.audit_to_date).format("YYYY-MM-DD"),
          "YYYY-MM-DD"
        );
        const daysDiff = moment
          .duration(auditToDate.diff(momentCurrentDate))
          .asDays();

        var emailMessage = null;
        if (daysDiff < 0) {
          //Overdue
          emailMessage = {
            msg_subject: "Internal Audit Overdue",
            msgbody: auditCreatorOverDueReminderTemplate(
              audit.user.name,
              audit,
              `${process.env.FRONTEND_BASE_URL}/internal-audit/${audit.id}/report`
            ),
            msg_to: audit.user.email,
          };
        } else {
          //Reminder
          emailMessage = {
            msg_subject: "Internal Audit Reminder",
            msgbody: auditCreatorReminderTemplate(
              audit.user.name,
              audit,
              `${process.env.FRONTEND_BASE_URL}/internal-audit/${audit.id}/report`
            ),
            msg_to: audit.user.email,
          };
        }
        if (emailMessage) {
          await Audit.update(
            { reminder_sent: 1 },
            {
              where: { id: audit.id },
            }
          );
          await sequelize.query(
            `InsertEmailAlerts  @msg_to = '${
              emailMessage.msg_to
            }', @msg_cc = '${
              emailMessage.msg_cc ? emailMessage.msg_cc : ""
            }', @msg_subject = '${emailMessage.msg_subject}', @msg_body = '${
              emailMessage.msgbody
            }', @is_send = 0, @emailtype = internal_audit;`
          );
        }
      }
    });
    res.send({
      data: audits,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  getAuditById,
  addAudit,
  updateAudit,
  addAuditNotification,
  addAuditChecklist,
  updateAuditChecklist,
  deleteAuditChecklist,
  submitAuditChecklist,
  completeAudit,
  copyAuditChecklist,
  sendAuditReminder,
};
