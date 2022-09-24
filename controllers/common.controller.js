const { Op, QueryTypes } = require("sequelize");
const models = require("../models");

const {
  addLocationValidationSchema,
} = require("../validations/common.validation");
const { asyncForEach } = require("../helpers/asyncForEach");

const {
  sequelize,
  Role,
  VEmployeeList,
  Company,
  UserCompany,
  Year,
  Quater,
  Aspect,
  Department,
  NcrArea,
  NcrSource,
  NcrCategory,
  NcrNCType,
  NcrManagementSystem,
  NcrStatus,
  CalibrationFrequency,
  Month,
  AuditFinding,
  AuditStatus,
  FindingType,
  Location,
  EmergencyDrillType,
  VFaceTerminalMaster,
  LocationDeviceFaceIds,
} = models;

getRoles = async (req, res, next) => {
  try {
    const results = await Role.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getEmployees = async (req, res, next) => {
  try {
    const results = await VEmployeeList.findAll({
      where: {
        [Op.and]: [
          {
            Status: "active",
          },
          {
            EmailID: {
              [Op.ne]: null,
            },
          },
        ],
      },
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getCompanies = async (req, res, next) => {
  try {
    const results = await Company.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getUserCompanies = async (req, res, next) => {
  try {
    const results = await UserCompany.findAll({
      where: { user_id: req.currentUser.id },
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getYears = async (req, res, next) => {
  try {
    const results = await Year.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getQuaters = async (req, res, next) => {
  try {
    const results = await Quater.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getAspects = async (req, res, next) => {
  try {
    const results = await Aspect.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getDepartments = async (req, res, next) => {
  try {
    const results = await Department.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getAreas = async (req, res, next) => {
  try {
    const results = await NcrArea.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getSources = async (req, res, next) => {
  try {
    const results = await NcrSource.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getCategories = async (req, res, next) => {
  try {
    const results = await NcrCategory.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getNCTypes = async (req, res, next) => {
  try {
    const results = await NcrNCType.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getManagementSystems = async (req, res, next) => {
  try {
    const results = await NcrManagementSystem.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getStatuses = async (req, res, next) => {
  try {
    const results = await NcrStatus.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getMonths = async (req, res, next) => {
  try {
    const results = await Month.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getAuditFindinds = async (req, res, next) => {
  try {
    const results = await AuditFinding.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getNcrByMonths = async (req, res, next) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT 
    SUM(CASE datepart(month,ncr_date) WHEN 1 THEN 1 ELSE 0 END) AS 'Jan',
    SUM(CASE datepart(month,ncr_date) WHEN 2 THEN 1 ELSE 0 END) AS 'Feb',
    SUM(CASE datepart(month,ncr_date) WHEN 3 THEN 1 ELSE 0 END) AS 'Mar',
    SUM(CASE datepart(month,ncr_date) WHEN 4 THEN 1 ELSE 0 END) AS 'Apr',
    SUM(CASE datepart(month,ncr_date) WHEN 5 THEN 1 ELSE 0 END) AS 'May',
    SUM(CASE datepart(month,ncr_date) WHEN 6 THEN 1 ELSE 0 END) AS 'Jun',
    SUM(CASE datepart(month,ncr_date) WHEN 7 THEN 1 ELSE 0 END) AS 'Jul',
    SUM(CASE datepart(month,ncr_date) WHEN 8 THEN 1 ELSE 0 END) AS 'Aug',
    SUM(CASE datepart(month,ncr_date) WHEN 9 THEN 1 ELSE 0 END) AS 'Sep',
    SUM(CASE datepart(month,ncr_date) WHEN 10 THEN 1 ELSE 0 END) AS 'Oct',
    SUM(CASE datepart(month,ncr_date) WHEN 11 THEN 1 ELSE 0 END) AS 'Nov',
    SUM(CASE datepart(month,ncr_date) WHEN 12 THEN 1 ELSE 0 END) AS 'Dec'
  FROM
      qhses_ncr_records
  WHERE YEAR(ncr_date) = YEAR(GETDATE())`,
      { type: QueryTypes.SELECT }
    );
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getNcrByDepartment = async (req, res, next) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT b.name, count(a.id) as ncrs
      FROM qhses_ncr_records a
      RIGHT join qhses_departments b on a.department_id=b.id
      Group by department_id, b.name`
    );
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getNcrByStatus = async (req, res, next) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT b.name, count(a.id) as ncrs
      FROM qhses_ncr_records a
      RIGHT join qhses_ncr_statuses b on a.status_id=b.id
      Group by status_id, b.name`
    );
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getNcrByStatusAndMonth = async (req, res, next) => {
  try {
    const [closedResults, closedMetadata] = await sequelize.query(
      `SELECT 
      SUM(CASE datepart(month,ncr_date) WHEN 1 THEN 1 ELSE 0 END) AS 'Jan',
      SUM(CASE datepart(month,ncr_date) WHEN 2 THEN 1 ELSE 0 END) AS 'Feb',
      SUM(CASE datepart(month,ncr_date) WHEN 3 THEN 1 ELSE 0 END) AS 'Mar',
      SUM(CASE datepart(month,ncr_date) WHEN 4 THEN 1 ELSE 0 END) AS 'Apr',
      SUM(CASE datepart(month,ncr_date) WHEN 5 THEN 1 ELSE 0 END) AS 'May',
      SUM(CASE datepart(month,ncr_date) WHEN 6 THEN 1 ELSE 0 END) AS 'Jun',
      SUM(CASE datepart(month,ncr_date) WHEN 7 THEN 1 ELSE 0 END) AS 'Jul',
      SUM(CASE datepart(month,ncr_date) WHEN 8 THEN 1 ELSE 0 END) AS 'Aug',
      SUM(CASE datepart(month,ncr_date) WHEN 9 THEN 1 ELSE 0 END) AS 'Sep',
      SUM(CASE datepart(month,ncr_date) WHEN 10 THEN 1 ELSE 0 END) AS 'Oct',
      SUM(CASE datepart(month,ncr_date) WHEN 11 THEN 1 ELSE 0 END) AS 'Nov',
      SUM(CASE datepart(month,ncr_date) WHEN 12 THEN 1 ELSE 0 END) AS 'Dec'
    FROM
        qhses_ncr_records
    WHERE YEAR(ncr_date) = YEAR(GETDATE()) AND status_id = 6`,
      { type: QueryTypes.SELECT }
    );
    const [notClosedResults, notClosedmetadata] = await sequelize.query(
      `SELECT 
      SUM(CASE datepart(month,ncr_date) WHEN 1 THEN 1 ELSE 0 END) AS 'Jan',
      SUM(CASE datepart(month,ncr_date) WHEN 2 THEN 1 ELSE 0 END) AS 'Feb',
      SUM(CASE datepart(month,ncr_date) WHEN 3 THEN 1 ELSE 0 END) AS 'Mar',
      SUM(CASE datepart(month,ncr_date) WHEN 4 THEN 1 ELSE 0 END) AS 'Apr',
      SUM(CASE datepart(month,ncr_date) WHEN 5 THEN 1 ELSE 0 END) AS 'May',
      SUM(CASE datepart(month,ncr_date) WHEN 6 THEN 1 ELSE 0 END) AS 'Jun',
      SUM(CASE datepart(month,ncr_date) WHEN 7 THEN 1 ELSE 0 END) AS 'Jul',
      SUM(CASE datepart(month,ncr_date) WHEN 8 THEN 1 ELSE 0 END) AS 'Aug',
      SUM(CASE datepart(month,ncr_date) WHEN 9 THEN 1 ELSE 0 END) AS 'Sep',
      SUM(CASE datepart(month,ncr_date) WHEN 10 THEN 1 ELSE 0 END) AS 'Oct',
      SUM(CASE datepart(month,ncr_date) WHEN 11 THEN 1 ELSE 0 END) AS 'Nov',
      SUM(CASE datepart(month,ncr_date) WHEN 12 THEN 1 ELSE 0 END) AS 'Dec'
    FROM
      qhses_ncr_records
    WHERE YEAR(ncr_date) = YEAR(GETDATE()) AND status_id != 6`,
      { type: QueryTypes.SELECT }
    );
    let data = [];
    Object.keys(closedResults).forEach((key) => {
      data.push({
        month: key,
        closedNcrs: closedResults[key],
        notClosedNcrs: notClosedResults[key],
      });
    });
    res.send({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
getNcrByCompany = async (req, res, next) => {
  try {
    const userCompanies = await UserCompany.findAll({
      where: { user_id: req.currentUser.id },
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
    });

    let userCompanyIds = [];

    userCompanies.forEach((userCompany) => {
      userCompanyIds.push(userCompany.company_id);
    });
    const [results, metadata] = await sequelize.query(
      `SELECT b.name, count(a.id) as ncrs
      FROM qhses_ncr_records a
      RIGHT join qhses_companies b on a.company_id=b.id
      WHERE b.id IN (${userCompanyIds})
      Group by company_id, b.name`
    );
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getCalibrationFrequencies = async (req, res, next) => {
  try {
    const results = await CalibrationFrequency.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getDueCalibationsByMonth = async (req, res, next) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT 
    SUM(CASE datepart(month,calibration_due_date) WHEN 1 THEN 1 ELSE 0 END) AS 'Jan',
    SUM(CASE datepart(month,calibration_due_date) WHEN 2 THEN 1 ELSE 0 END) AS 'Feb',
    SUM(CASE datepart(month,calibration_due_date) WHEN 3 THEN 1 ELSE 0 END) AS 'Mar',
    SUM(CASE datepart(month,calibration_due_date) WHEN 4 THEN 1 ELSE 0 END) AS 'Apr',
    SUM(CASE datepart(month,calibration_due_date) WHEN 5 THEN 1 ELSE 0 END) AS 'May',
    SUM(CASE datepart(month,calibration_due_date) WHEN 6 THEN 1 ELSE 0 END) AS 'Jun',
    SUM(CASE datepart(month,calibration_due_date) WHEN 7 THEN 1 ELSE 0 END) AS 'Jul',
    SUM(CASE datepart(month,calibration_due_date) WHEN 8 THEN 1 ELSE 0 END) AS 'Aug',
    SUM(CASE datepart(month,calibration_due_date) WHEN 9 THEN 1 ELSE 0 END) AS 'Sep',
    SUM(CASE datepart(month,calibration_due_date) WHEN 10 THEN 1 ELSE 0 END) AS 'Oct',
    SUM(CASE datepart(month,calibration_due_date) WHEN 11 THEN 1 ELSE 0 END) AS 'Nov',
    SUM(CASE datepart(month,calibration_due_date) WHEN 12 THEN 1 ELSE 0 END) AS 'Dec'
  FROM
      qhses_calibration_records
  WHERE YEAR(calibration_due_date) = YEAR(GETDATE())`,
      { type: QueryTypes.SELECT }
    );
    let data = [];
    Object.keys(results).forEach((key) => {
      data.push({
        month: key,
        calibrations: results[key],
      });
    });
    res.send({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

getCalibrationsByFrequency = async (req, res, next) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT b.id, b.name, count(a.id) as calibrations
      FROM qhses_calibration_records a
      RIGHT JOIN qhses_calibration_frequencies b on a.calibration_frequency_id=b.id
      Group by calibration_frequency_id, b.name, b.id ORDER BY b.id`
    );
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getAuditStatuses = async (req, res, next) => {
  try {
    const results = await AuditStatus.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getFindingTypes = async (req, res, next) => {
  try {
    const results = await FindingType.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getLocations = async (req, res, next) => {
  try {
    const results = await Location.findAll({
      include: [
        {
          model: VFaceTerminalMaster,
          as: "faceIds",
        },
      ],
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

addLocation = async (req, res, next) => {
  try {
    await addLocationValidationSchema.validateAsync(req.body);
    // const faceIds = req.body.device_face_ids.map((id) => {
    //   return {
    //     device_face_id: id,
    //   };
    // });
    // req.body.faceIds = faceIds;

    const saveLocation = await Location.create(req.body, {
      // include: [
      //   {
      //     model: LocationDeviceFaceIds,
      //     as: "locationFaceIds",
      //   },
      // ],
    });

    await asyncForEach(req.body.device_face_ids, async (id) => {
      await LocationDeviceFaceIds.create({
        location_id: saveLocation.id,
        device_face_id: id,
      });
    });

    const locationData = await Location.findOne({
      where: { id: saveLocation.id },
      include: [
        {
          model: VFaceTerminalMaster,
          as: "faceIds",
        },
      ],
    });
    res.send({
      data: locationData,
    });
  } catch (error) {
    next(error);
  }
};

getEmergencyDrillTypes = async (req, res, next) => {
  try {
    const results = await EmergencyDrillType.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
getFaceTerminals = async (req, res, next) => {
  try {
    const results = await VFaceTerminalMaster.findAll();
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getRoles,
  getCompanies,
  getUserCompanies,
  getYears,
  getQuaters,
  getAspects,
  getDepartments,
  getAreas,
  getSources,
  getCategories,
  getNCTypes,
  getManagementSystems,
  getStatuses,
  getMonths,
  getAuditFindinds,
  getNcrByMonths,
  getNcrByDepartment,
  getNcrByStatus,
  getNcrByStatusAndMonth,
  getNcrByCompany,
  getCalibrationFrequencies,
  getDueCalibationsByMonth,
  getCalibrationsByFrequency,
  getAuditStatuses,
  getFindingTypes,
  getLocations,
  addLocation,
  getEmergencyDrillTypes,
  getFaceTerminals,
};
