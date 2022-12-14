require("dotenv").config();
const Joi = require("joi");
const { Op } = require("sequelize");
const createError = require("http-errors");
const moment = require("moment");
const models = require("../models");
const {
  addEmergencyDrillValidationSchema,
  addNotificationValidationSchema,
  attendeceValidationSchema,
} = require("../validations/emergencyDrill.validation");
const { asyncForEach } = require("../helpers/asyncForEach");
const {
  drillCreatedTemplate,
  drillNotificationToEmailTemplate,
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
  EmergencyDrill,
  EmergencyDrillStatus,
  EmergencyDrillType,
  Location,
  EmergencyDrillLocation,
  EmergencyDrillNotification,
  EmergencyDrillNotificationToEmail,
  VEmployeeAttendence,
  EmergencyDrillEmployeesAttendence,
  EmergencyDrillHighlight,
  EmergencyDrillAttachment,
  NcrRecord,
} = models;

const notificationInclude = [
  {
    model: EmergencyDrillNotificationToEmail,
    as: "toEmailUsers",
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
    ],
  },
];

const emergencyDrillIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: Year, as: "year" },
  { model: Month, as: "month" },
  { model: Company, as: "company" },
  { model: EmergencyDrillType, as: "type" },
  {
    model: Location,
    as: "locations",
  },
  {
    model: EmergencyDrillNotification,
    as: "notification",
    include: notificationInclude,
  },
  {
    model: EmergencyDrillHighlight,
    as: "highlights",
  },
  {
    model: EmergencyDrillEmployeesAttendence,
    as: "attendenceEmployees",
  },
  {
    model: EmergencyDrillAttachment,
    as: "attachments",
  },

  { model: EmergencyDrillStatus, as: "status" },
];

index = async (req, res, next) => {
  try {
    let limit = 10;
    let offset = 0 + (req.query.page - 1) * limit;
    const yearId = req.query.year_id;
    const companyId = req.query.company_id;
    var whereClause = {};
    if (yearId) {
      whereClause["year_id"] = {
        [Op.eq]: yearId,
      };
    }
    if (companyId) {
      whereClause["company_id"] = {
        [Op.eq]: companyId,
      };
    }
    const results = await EmergencyDrill.findAll({
      where: whereClause,
      include: emergencyDrillIncludes,
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getEmergencyDrillById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const emergencyDrill = await EmergencyDrill.findOne({
      where: { id: id },
      include: emergencyDrillIncludes,
    });
    res.send({
      data: emergencyDrill,
    });
  } catch (error) {
    next(error);
  }
};

addEmergencyDrill = async (req, res, next) => {
  try {
    await addEmergencyDrillValidationSchema.validateAsync(req.body);
    const userId = req.currentUser.id;

    var drill_number = "";
    const code = req.body.company_code;
    drill_number += `ASH-ED-${code.toUpperCase()}`;

    const idLength = 7;
    const latestEmergencyDrill = await EmergencyDrill.findOne({
      order: [["createdAt", "DESC"]],
    });
    const emergencyDrillId = latestEmergencyDrill
      ? latestEmergencyDrill.id + 1
      : 1;
    const paddedEmergencyDrillId = emergencyDrillId
      .toString()
      .padStart(idLength, "0");
    drill_number += `-${paddedEmergencyDrillId}`;
    req.body.drill_number = drill_number;
    req.body.user_id = userId;

    const createdDrill = await EmergencyDrill.create(req.body);

    let drillLocations = [];
    req.body.location_ids.forEach((locationId) => {
      drillLocations.push({
        emergency_drill_id: createdDrill.id,
        location_id: locationId,
      });
    });
    await EmergencyDrillLocation.bulkCreate(drillLocations);

    const emergencyDrillRes = await EmergencyDrill.findOne({
      where: { id: createdDrill.id },
      include: emergencyDrillIncludes,
    });

    const emailMessage = {
      msg_to: emergencyDrillRes.user.email,
      msg_subject: "Emergency Drill Scheduled",
      msgbody: drillCreatedTemplate(
        emergencyDrillRes.user.name,
        emergencyDrillRes,
        `${process.env.FRONTEND_BASE_URL}/emergency-drill/${emergencyDrillRes.id}/report`
      ),
    };
    // await sequelize.query(
    //   `InsertEmailAlerts  @msg_to = '${emailMessage.msg_to}', @msg_cc = '${
    //     emailMessage.msg_cc ? emailMessage.msg_cc : ""
    //   }', @msg_subject = '${emailMessage.msg_subject}', @msg_body = '${
    //     emailMessage.msgbody
    //   }', @is_send = 0, @emailtype = emergency_drill;`
    // );
    res.send({
      data: emergencyDrillRes,
    });
  } catch (error) {
    next(error);
  }
};

addEmergencyDrillNotification = async (req, res, next) => {
  try {
    await addNotificationValidationSchema.validateAsync(req.body);
    const drillId = req.body.emergency_drill_id;
    const userId = req.currentUser.id;
    req.body.user_id = userId;

    const drillExists = await EmergencyDrill.findOne({
      where: { id: drillId },
      include: [
        {
          model: EmergencyDrillNotification,
          as: "notification",
        },
      ],
    });

    if (!drillExists) throw createError.NotFound("Drill Not Found!");
    if (drillExists.notification)
      throw createError.BadRequest(
        "Notification Already Added Against this Drill!"
      );

    await EmergencyDrillNotification.create(req.body, {
      include: [
        { model: EmergencyDrillNotificationToEmail, as: "toEmailUsers" },
      ],
    });

    await EmergencyDrill.update(
      { status_id: 2 },
      {
        where: { id: drillId },
      }
    );

    const drillRes = await EmergencyDrill.findOne({
      where: { id: drillId },
      include: emergencyDrillIncludes,
    });

    let emailMessages = [];
    if (drillRes.notification && drillRes.notification.toEmailUsers) {
      await asyncForEach(
        drillRes.notification.toEmailUsers,
        async (toEmailUser) => {
          const email = toEmailUser.user.email;
          const subject = "Emergency Drill";
          const body = drillNotificationToEmailTemplate(
            toEmailUser.user.name,
            drillRes,
            `${process.env.FRONTEND_BASE_URL}/emergency-drill/${drillRes.id}/report`
          );
          var msgObj = {
            msg_subject: subject,
            msgbody: body,
            msg_to: email,
          };
          emailMessages.push(msgObj);
        }
      );
    }
    if (emailMessages && emailMessages.length > 0) {
      // emailMessages.forEach(async (emailMessage) => {
      //   await sequelize.query(
      //     `InsertEmailAlerts  @msg_to = '${emailMessage.msg_to}', @msg_cc = '${
      //       emailMessage.msg_cc ? emailMessage.msg_cc : ""
      //     }', @msg_subject = '${emailMessage.msg_subject}', @msg_body = '${
      //       emailMessage.msgbody
      //     }', @is_send = 0, @emailtype = emergency_drill;`
      //   );
      // });
    }

    res.send({
      data: drillRes,
    });
  } catch (error) {
    next(error);
  }
};

const fetchEmployessData = async (shiftDate, locationsArr) => {
  const employees = await VEmployeeAttendence.findAll({
    where: {
      LocationCode: locationsArr,
      [Op.and]: [
        sequelize.where(
          sequelize.literal("convert(date, SwipeDate)"),
          "=",
          shiftDate
        ),
      ],
    },
    raw: true,
  });

  await asyncForEach(employees, async (employee) => {
    employee.employee_type = "EMPLOYEE";
    employee.employee_id = employee.emp_id;
    employee.employee_name = employee.emp_name;
    employee.company_name = employee.company_name;
    employee.company_code = employee.comp_code;
    employee.department_name = employee.DepartmentDesc;
    employee.department_code = employee.DepartmentCode;
    employee.location_name = employee.LocationDesc;
    employee.location_code = employee.LocationCode;
    employee.present = false;
    employee.out_of_office = false;
  });

  // const newEmployeesData = employees.map((employee) => {
  //   return {
  //     employee_id: employee.emp_id,
  //     employee_name: employee.emp_name,
  //     company_name: employee.company_name,
  //     company_code: employee.comp_code,
  //     department_name: employee.DepartmentDesc,
  //     department_code: employee.DepartmentCode,
  //     location_name: employee.LocationDesc,
  //     location_code: employee.LocationCode,
  //     present: false,
  //     out_of_office: false,
  //     submitted: false,
  //   };
  // });
  return employees;
};

getEmployeeAttendenceDataByDrillLocation = async (req, res, next) => {
  try {
    const drillId = req.params.id;
    if (!drillId) throw createError.NotFound("Drill Not Found!");
    const emergencyDrill = await EmergencyDrill.findOne({
      where: { id: drillId },
      include: emergencyDrillIncludes,
    });
    if (!emergencyDrill) throw createError.NotFound("Drill Not Found!");

    var employeesData = [];
    employeesData = await EmergencyDrillEmployeesAttendence.findAll({
      where: { emergency_drill_id: drillId },
    });

    if (!employeesData.length) {
      var locationCodesArr = [];
      await asyncForEach(emergencyDrill.locations, async (location) => {
        locationCodesArr.push(location.code);
      });
      employeesData = await fetchEmployessData(
        emergencyDrill.shift_date_time,
        locationCodesArr
      );
    }
    res.send({
      data: employeesData,
    });
  } catch (error) {
    next(error);
  }
};

saveEmployeesAttendence = async (req, res, next) => {
  try {
    await attendeceValidationSchema.validateAsync(req.body);
    const drillId = req.params.id;
    if (!drillId) throw createError.NotFound("Drill Not Found!");
    const emergencyDrill = await EmergencyDrill.findOne({
      where: { id: drillId },
      include: emergencyDrillIncludes,
    });
    if (!emergencyDrill) throw createError.NotFound("Drill Not Found!");

    await asyncForEach(req.body.attendence, async (item) => {
      if (item.id) {
        const attendenceObj = await EmergencyDrillEmployeesAttendence.findOne({
          where: { id: item.id },
        });
        if (attendenceObj) {
          await EmergencyDrillEmployeesAttendence.update(item, {
            where: { id: item.id },
          });
        }
      } else {
        await EmergencyDrillEmployeesAttendence.create(item);
      }
    });
    if (req.body.deleteAttedence) {
      await asyncForEach(req.body.deleteAttedence, async (item) => {
        await EmergencyDrillEmployeesAttendence.destroy({
          where: { id: item.id },
        });
      });
    }
    const employeesAttedenceData =
      await EmergencyDrillEmployeesAttendence.findAll({
        where: { emergency_drill_id: drillId },
      });

    res.send({
      data: employeesAttedenceData,
    });
  } catch (error) {
    next(error);
  }
};

submitEmployeesAttendence = async (req, res, next) => {
  try {
    await attendeceValidationSchema.validateAsync(req.body);
    const drillId = req.params.id;
    if (!drillId) throw createError.NotFound("Drill Not Found!");
    const emergencyDrill = await EmergencyDrill.findOne({
      where: { id: drillId },
      include: emergencyDrillIncludes,
    });
    if (!emergencyDrill) throw createError.NotFound("Drill Not Found!");
    await asyncForEach(req.body.attendence, async (item) => {
      if (item.id) {
        const attendenceObj = await EmergencyDrillEmployeesAttendence.findOne({
          where: { id: item.id },
        });
        if (attendenceObj) {
          await EmergencyDrillEmployeesAttendence.update(item, {
            where: { id: item.id },
          });
        }
      } else {
        await EmergencyDrillEmployeesAttendence.create(item);
      }
    });
    if (req.body.deleteAttedence) {
      await asyncForEach(req.body.deleteAttedence, async (item) => {
        await EmergencyDrillEmployeesAttendence.destroy({
          where: { id: item.id },
        });
      });
    }
    await EmergencyDrill.update(
      { status_id: 3, attendence_submitted: 1 },
      {
        where: { id: drillId },
      }
    );

    const drillRes = await EmergencyDrill.findOne({
      where: { id: drillId },
      include: emergencyDrillIncludes,
    });

    res.send({
      data: drillRes,
    });
  } catch (error) {
    next(error);
  }
};

updateEmergencyDrill = async (req, res, next) => {
  try {
    const drillId = req.params.id;
    if (!drillId) throw createError.NotFound("Drill Not Found!");
    const emergencyDrill = await EmergencyDrill.findOne({
      where: { id: drillId },
      include: emergencyDrillIncludes,
    });
    if (!emergencyDrill) throw createError.NotFound("Drill Not Found!");
    req.body.status_id = 4;
    await EmergencyDrill.update(req.body, {
      where: { id: drillId },
    });
    if (req.body.highlightList) {
      req.body.highlightList = JSON.parse(req.body.highlightList);
      await EmergencyDrillHighlight.bulkCreate(req.body.highlightList);
    }

    /**
     * Upload Attachments
     */
    if (req.files && req.files.length) {
      const docObj = req.files.map((file) => {
        return {
          emergency_drill_id: drillId,
          attachment_name: file.filename,
        };
      });
      await EmergencyDrillAttachment.bulkCreate(docObj);
    }
    /**
     * Upload Attachments End
     */

    if (req.body.submitted) {
      const company = await Company.findOne({
        where: { id: emergencyDrill.company_id },
      });
      const department = await Department.findOne({
        where: { code: "GEN" },
      });

      const category = await NcrCategory.findOne({
        where: { code: "CAR" },
      });
      const ncrSource = await NcrSource.findOne({
        where: { code: "EED" },
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
        user_id: emergencyDrill.user_id,
        company_id: company.id,
        department_id: department.id,
        category_id: category.id,
        source_id: ncrSource.id,
        ncr_date: currentDate,
        finding_type_id: 1,
        description: req.body.corrective_action_points,
        status_id: 8,
      };
      const createdNcrRes = await NcrRecord.create(ncrObj);
      createdNcrId = createdNcrRes.id;
    }

    const drillRes = await EmergencyDrill.findOne({
      where: { id: drillId },
      include: emergencyDrillIncludes,
    });

    res.send({
      data: drillRes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  getEmergencyDrillById,
  addEmergencyDrill,
  addEmergencyDrillNotification,
  getEmployeeAttendenceDataByDrillLocation,
  saveEmployeesAttendence,
  submitEmployeesAttendence,
  updateEmergencyDrill,
};
