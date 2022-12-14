const Joi = require("joi");
const { Op } = require("sequelize");
const multer = require("multer");
const models = require("../models");
const db = require("../models");
const createError = require("http-errors");
const moment = require("moment");
require("dotenv").config();

const {
  recordValidationSchema,
  updateRecordValidationSchema,
} = require("../validations/calibrationRecord.validation");
const {
  calibrationRecordAddedTemplate,
  calibrationRecordAddedTemplateToOwner,
  calibrationRecordUpdatedTemplate,
  calibrationRecordUpdatedTemplateToOwner,
  calibrationDaysTemplate,
  calibrationOverDueTemplate,
} = require("../helpers/email_template");
const { response } = require("express");

const {
  sequelize,
  User,
  CalibrationRecord,
  CalibrationRecordHistory,
  CalibrationEmailMessage,
  CalibrationFrequency,
} = models;

const recordIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: User, as: "owner", attributes: { exclude: ["password"] } },
  { model: CalibrationFrequency, as: "calibrationFrequency" },
  {
    model: CalibrationRecordHistory,
    as: "history",
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
    ],
  },
];

index = async (req, res, next) => {
  try {
    let limit = 2;
    let offset = 0 + (req.query.page - 1) * limit;
    const filter = req.query.filter; //ALL, MONTH, WEEK, OVERDUE
    const searchValue = req.query.searchValue;
    var whereClause;
    whereClause = {
      // [Op.and]: [{ user_id: req.currentUser.id }],
    };

    if (searchValue) {
      whereClause[Op.or] = [
        {
          id: {
            [Op.like]: `%${searchValue.trim()}%`,
          },
        },
        {
          equipment_asset_number: {
            [Op.like]: `%${searchValue.trim()}%`,
          },
        },
      ];
    }
    if (filter == "MONTH") {
      whereClause["calibration_due_date"] = {
        [Op.between]: [
          moment().format("YYYY-MM-DD"),
          moment().add(31, "days").format("YYYY-MM-DD"),
        ],
      };
    }
    if (filter == "WEEK") {
      whereClause["calibration_due_date"] = {
        [Op.between]: [
          moment().format("YYYY-MM-DD"),
          moment().add(7, "days").format("YYYY-MM-DD"),
        ],
      };
    }
    if (filter == "OVERDUE") {
      whereClause["calibration_due_date"] = {
        [Op.lt]: moment().format("YYYY-MM-DD"),
      };
    }

    // {
    //   [Op.and]: [
    //     {
    //       id: {
    //         [Op.ne]: currentUserId,
    //       },
    //     },
    //   ],
    // },
    // const userRole = req.currentUser.role.title;

    // if (userRole == "USER") {
    //   whereClause = {
    //     [Op.or]: [{ user_id: req.currentUser.id }],
    //   };
    // } else if (userRole == "ADMIN") {
    //   whereClause = {};
    // }
    const results = await CalibrationRecord.findAll({
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
    req.body.certification_attachment = req.file.filename;
    await recordValidationSchema.validateAsync(req.body);
    req.body.user_id = req.currentUser.id;
    const result = await CalibrationRecord.create(req.body);

    let history = {
      record_id: result.id,
      user_id: req.currentUser.id,
      calibration_date: req.body.calibration_date,
      calibration_due_date: req.body.calibration_due_date,
      certificate_number: req.body.certificate_number,
      certification_attachment: req.body.certification_attachment,
      remarks: req.body.remarks,
    };
    await CalibrationRecordHistory.create(history);

    const record = await CalibrationRecord.findOne({
      where: { id: result.id },
      include: recordIncludes,
    });

    /**
     * Record Created EMAIL
     */
    const emailObj = {
      msg_to: record.user.email,
      msg_subject: "Equipment Calibration Created",
      msgbody: calibrationRecordAddedTemplate(
        record.user.name,
        `${process.env.FRONTEND_BASE_URL}/equipment-calibration/records/edit/${record.id}`
      ),
    };
    // await sequelize.query(
    //   `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
    //     emailObj.msg_cc ? emailObj.msg_cc : ""
    //   }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
    //     emailObj.msgbody
    //   }', @is_send = 0, @emailtype = calibration;`
    // );

    const ownerEmailObj = {
      msg_to: record.owner.email,
      msg_subject: "Equipment Calibration Created",
      msgbody: calibrationRecordAddedTemplateToOwner(
        record.owner.name,
        `${process.env.FRONTEND_BASE_URL}/equipment-calibration/records/edit/${record.id}`
      ),
    };

    // await sequelize.query(
    //   `InsertEmailAlerts  @msg_to = '${ownerEmailObj.msg_to}', @msg_cc = '${
    //     ownerEmailObj.msg_cc ? ownerEmailObj.msg_cc : ""
    //   }', @msg_subject = '${ownerEmailObj.msg_subject}', @msg_body = '${
    //     ownerEmailObj.msgbody
    //   }', @is_send = 0, @emailtype = calibration;`
    // );

    /**
     * END Record Created EMAIL
     */

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
    req.body.certification_attachment = req.file.filename;
    await updateRecordValidationSchema.validateAsync(req.body);
    const id = req.params.id;
    const record = await CalibrationRecord.findOne({
      where: { id: id },
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { model: User, as: "owner", attributes: { exclude: ["password"] } },
      ],
    });

    if (!(record && record.user.id === req.currentUser.id))
      throw createError.BadRequest();

    req.body.user_id = req.currentUser.id;
    const result = await CalibrationRecord.update(req.body, {
      where: { id: id, user_id: req.currentUser.id },
    });
    if (result == 0) throw createError.BadRequest();

    let history = {
      record_id: id,
      user_id: req.currentUser.id,
      calibration_date: req.body.calibration_date,
      calibration_due_date: req.body.calibration_due_date,
      certificate_number: req.body.certificate_number,
      certification_attachment: req.body.certification_attachment,
      remarks: req.body.remarks,
    };
    await CalibrationRecordHistory.create(history);

    /**
     * Record Updated EMAIL
     */

    const emailObj = {
      msg_to: record.user.email,
      msg_subject: "Equipment Calibration Updated",
      msgbody: calibrationRecordUpdatedTemplate(
        record.user.name,
        `${process.env.FRONTEND_BASE_URL}/equipment-calibration/records/edit/${record.id}`
      ),
    };
    // await sequelize.query(
    //   `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
    //     emailObj.msg_cc ? emailObj.msg_cc : ""
    //   }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
    //     emailObj.msgbody
    //   }', @is_send = 0, @emailtype = calibration;`
    // );

    const ownerEmailObj = {
      msg_to: record.owner.email,
      msg_subject: "Equipment Calibration Updated",
      msgbody: calibrationRecordUpdatedTemplateToOwner(
        record.owner.name,
        `${process.env.FRONTEND_BASE_URL}/equipment-calibration/records/edit/${record.id}`
      ),
    };
    // await sequelize.query(
    //   `InsertEmailAlerts  @msg_to = '${ownerEmailObj.msg_to}', @msg_cc = '${
    //     ownerEmailObj.msg_cc ? ownerEmailObj.msg_cc : ""
    //   }', @msg_subject = '${ownerEmailObj.msg_subject}', @msg_body = '${
    //     ownerEmailObj.msgbody
    //   }', @is_send = 0, @emailtype = calibration;`
    // );
    /**
     * END Record Updated EMAIL
     */
    const data = await CalibrationRecord.findOne({
      where: { id: id },
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

show = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await CalibrationRecord.findOne({
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

checkCalibrationDueDate = async (req, res, next) => {
  var whereClause = {};
  try {
    whereClause[Op.or] = [
      {
        calibration_due_date: {
          [Op.between]: [
            moment().format("YYYY-MM-DD"),
            moment().add(31, "days").format("YYYY-MM-DD"),
          ],
        },
      },
      {
        calibration_due_date: {
          [Op.lt]: moment().format("YYYY-MM-DD"),
        },
      },
    ];

    const records = await CalibrationRecord.findAll({
      where: whereClause,
      include: recordIncludes,
    });

    if (records.length) {
      var currentDate = moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD");
      records.forEach(async (record) => {
        if (record) {
          const calibrationDueDate = moment(
            moment(record.calibration_due_date).format("YYYY-MM-DD"),
            "YYYY-MM-DD"
          );
          const days = moment
            .duration(calibrationDueDate.diff(currentDate))
            .asDays();

          if (days >= 30) {
            const body = calibrationDaysTemplate(
              record.user.name,
              calibrationDueDate,
              days,
              `${process.env.FRONTEND_BASE_URL}/equipment-calibration/records/edit/${record.id}`
            );
            emailObj = {
              msg_to: record.user.email,
              msg_subject: "Equipment Calibration Alert",
              msgbody: body,
            };
            // await sequelize.query(
            //   `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
            //     emailObj.msg_cc ? emailObj.msg_cc : ""
            //   }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
            //     emailObj.msgbody
            //   }', @is_send = 0, @emailtype = calibration;`
            // );
          } else if (days >= 7) {
            const body = calibrationDaysTemplate(
              record.user.name,
              calibrationDueDate,
              days,
              `${process.env.FRONTEND_BASE_URL}/equipment-calibration/records/edit/${record.id}`
            );
            emailObj = {
              msg_to: record.user.email,
              msg_subject: "Equipment Calibration Alert",
              msgbody: body,
            };
            // await sequelize.query(
            //   `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
            //     emailObj.msg_cc ? emailObj.msg_cc : ""
            //   }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
            //     emailObj.msgbody
            //   }', @is_send = 0, @emailtype = calibration;`
            // );
          } else if (days >= 1) {
            const body = calibrationDaysTemplate(
              record.user.name,
              calibrationDueDate,
              days,
              `${process.env.FRONTEND_BASE_URL}/equipment-calibration/records/edit/${record.id}`
            );
            emailObj = {
              msg_to: record.user.email,
              msg_subject: "Equipment Calibration Alert",
              msgbody: body,
            };
            // await sequelize.query(
            //   `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
            //     emailObj.msg_cc ? emailObj.msg_cc : ""
            //   }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
            //     emailObj.msgbody
            //   }', @is_send = 0, @emailtype = calibration;`
            // );
          } else {
            //Overdue
            const body = calibrationOverDueTemplate(
              record.user.name,
              calibrationDueDate,
              days,
              `${process.env.FRONTEND_BASE_URL}/equipment-calibration/records/edit/${record.id}`
            );
            emailObj = {
              msg_to: record.user.email,
              msg_subject: "Equipment Calibration Alert",
              msgbody: body,
            };
            // await sequelize.query(
            //   `InsertEmailAlerts  @msg_to = '${emailObj.msg_to}', @msg_cc = '${
            //     emailObj.msg_cc ? emailObj.msg_cc : ""
            //   }', @msg_subject = '${emailObj.msg_subject}', @msg_body = '${
            //     emailObj.msgbody
            //   }', @is_send = 0, @emailtype = calibration;`
            // );
          }
        }
      });
    }
    res.send({
      message: "Request processed!",
    });
  } catch (error) {
    next(error);
  }
};

getAllCalibratioRecords = async (req, res, next) => {
  try {
    const results = await CalibrationRecord.findAll({
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
  show,
  checkCalibrationDueDate,
  getAllCalibratioRecords,
};
