const Joi = require("joi");
const models = require("../models");
const { Op, where } = require("sequelize");
const createError = require("http-errors");
const moment = require("moment");
require("dotenv").config();

const {
  addAssessmentValidationSchema,
  updateAssessmentValidationSchema,
} = require("../validations/coshhRegister.validation");
const { asyncForEach } = require("../helpers/asyncForEach");

const {
  User,
  Company,
  Department,
  CoshhRiskPerson,
  CoshhClassification,
  CoshhExposureRoute,
  CoshhHazardType,
  CoshhProtectiveEquipment,
  CoshhSubstancesDisposalType,
  CoshhRiskRating,

  CoshhAssessment,
  CoshhAssessmentRiskPerson,
  CoshhAssessmentClassification,
  CoshhAssessmentHazardType,
  CoshhAssessmentExposureRoute,
  CoshhAssessmentProtectiveEquipment,
  CoshhAssessmentSubstanceDisposalType,
} = models;

const assessmentIncludes = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: Company, as: "company" },
  { model: Department, as: "department" },
  { model: CoshhRiskPerson, as: "riskPersons" },
  { model: CoshhClassification, as: "classifications" },
  { model: CoshhHazardType, as: "hazardTypes" },
  { model: CoshhExposureRoute, as: "exposureRoutes" },
  { model: CoshhProtectiveEquipment, as: "protectiveEquipments" },
  { model: CoshhSubstancesDisposalType, as: "substancesDisposalTypes" },
  { model: CoshhRiskRating, as: "healthRiskRating" },
  { model: CoshhRiskRating, as: "environmentRiskRating" },
  { model: CoshhRiskRating, as: "riskRating" },
];

const getRiskPersons = async (req, res, next) => {
  try {
    const results = await CoshhRiskPerson.findAll({});
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getClassifications = async (req, res, next) => {
  try {
    const results = await CoshhClassification.findAll({});
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getExposureRoutes = async (req, res, next) => {
  try {
    const results = await CoshhExposureRoute.findAll({});
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getHazardTypes = async (req, res, next) => {
  try {
    const results = await CoshhHazardType.findAll({});
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getProtectiveEquipments = async (req, res, next) => {
  try {
    const results = await CoshhProtectiveEquipment.findAll({});
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getSubstancesDisposalTypesPersons = async (req, res, next) => {
  try {
    const results = await CoshhSubstancesDisposalType.findAll({});
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getRiskRatings = async (req, res, next) => {
  try {
    const results = await CoshhRiskRating.findAll({});
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    let limit = 2;
    let offset = 0 + (req.query.page - 1) * limit;
    const results = await CoshhAssessment.findAll({
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

const getAssessmentDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await CoshhAssessment.findOne({
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

const addAssessment = async (req, res, next) => {
  try {
    await addAssessmentValidationSchema.validateAsync(req.body);
    var assessment_number = "";
    const code = req.body.company_code;
    assessment_number += `${code.toUpperCase()}-COSHH-${moment().format(
      "DD-MM-YYYY"
    )}`;

    const idLength = 7;
    const latestAssessment = await CoshhAssessment.findOne({
      order: [["createdAt", "DESC"]],
    });
    const assessmentId = latestAssessment ? latestAssessment.id + 1 : 1;
    const paddedAssessmentId = assessmentId.toString().padStart(idLength, "0");
    assessment_number += `-${paddedAssessmentId}`;
    req.body.assessment_number = assessment_number;
    req.body.user_id = req.currentUser.id;

    if (req.file) {
      req.body.document_name = req.file.filename;
    }

    if (!req.body.department_id) {
      const department = await Department.findOne({
        where: { code: "GEN" },
      });
      req.body.department_id = department.id;
    }

    const riskPersonIds = JSON.parse(req.body.risk_person_ids);
    const classificationIds = JSON.parse(req.body.classification_ids);
    const hazardTypeIds = JSON.parse(req.body.hazard_type_ids);
    const exposurRouteIds = JSON.parse(req.body.exposure_route_ids);

    const assessmentRiskPersons = riskPersonIds.map((id) => {
      return {
        risk_person_id: id,
      };
    });

    const assessmentClassifications = classificationIds.map((id) => {
      return {
        classification_id: id,
      };
    });

    const assessmentHazardTypes = hazardTypeIds.map((id) => {
      return {
        hazard_type_id: id,
        other_description: id === 8 ? req.body.other_hazard_type : null,
      };
    });

    const assessmentExposureRoutes = exposurRouteIds.map((id) => {
      return {
        exposure_route_id: id,
        other_description: id === 5 ? req.body.other_exposure_route : null,
      };
    });

    req.body.assessmentRiskPersons = assessmentRiskPersons;
    req.body.assessmentClassifications = assessmentClassifications;
    req.body.assessmentHazardTypes = assessmentHazardTypes;
    req.body.assessmentExposureRoutes = assessmentExposureRoutes;

    if (req.body.protective_equipment_ids) {
      const protectiveEquipmentIds = JSON.parse(
        req.body.protective_equipment_ids
      );
      const assessmentProtectiveEquipments = protectiveEquipmentIds.map(
        (id) => {
          return {
            protective_equipment_id: id,
            other_description:
              id === 8 ? req.body.other_protective_equipment : null,
          };
        }
      );
      req.body.assessmentProtectiveEquipments = assessmentProtectiveEquipments;
    }
    if (req.body.substance_disposal_type_ids) {
      const substanceDisposalTypeIds = JSON.parse(
        req.body.substance_disposal_type_ids
      );
      const assessmentSubstanceDisposalTypes = substanceDisposalTypeIds.map(
        (id) => {
          return {
            substance_disposal_type_id: id,
            other_description:
              id === 4 ? req.body.other_substance_disposal_type : null,
          };
        }
      );
      req.body.assessmentSubstancesDisposalTypes =
        assessmentSubstanceDisposalTypes;
    }

    const result = await CoshhAssessment.create(req.body, {
      include: [
        {
          model: CoshhAssessmentRiskPerson,
          as: "assessmentRiskPersons",
        },
        {
          model: CoshhAssessmentClassification,
          as: "assessmentClassifications",
        },
        {
          model: CoshhAssessmentHazardType,
          as: "assessmentHazardTypes",
        },
        {
          model: CoshhAssessmentExposureRoute,
          as: "assessmentExposureRoutes",
        },
        {
          model: CoshhAssessmentProtectiveEquipment,
          as: "assessmentProtectiveEquipments",
        },
        {
          model: CoshhAssessmentSubstanceDisposalType,
          as: "assessmentSubstancesDisposalTypes",
        },
      ],
    });

    const assessment = await CoshhAssessment.findOne({
      where: { id: result.id },
      include: assessmentIncludes,
    });

    res.status(201).send({
      message: "Assessment added successfully.",
      data: assessment,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const updateAssessment = async (req, res, next) => {
  try {
    await updateAssessmentValidationSchema.validateAsync(req.body);
    const assessmentId = req.body.assessment_id;
    if (!req.body.department_id) {
      const department = Department.findOne({
        where: { code: "GEN" },
      });
      req.body.department_id = department.id;
    }

    if (req.file) {
      req.body.document_name = req.file.filename;
    }

    if (req.body.delete_risk_person_ids) {
      req.body.delete_risk_person_ids = JSON.parse(
        req.body.delete_risk_person_ids
      );
    }
    if (req.body.add_risk_person_ids) {
      req.body.add_risk_person_ids = JSON.parse(req.body.add_risk_person_ids);
    }

    if (req.body.delete_classification_ids) {
      req.body.delete_classification_ids = JSON.parse(
        req.body.delete_classification_ids
      );
    }
    if (req.body.add_classification_ids) {
      req.body.add_classification_ids = JSON.parse(
        req.body.add_classification_ids
      );
    }

    if (req.body.delete_hazard_type_ids) {
      req.body.delete_hazard_type_ids = JSON.parse(
        req.body.delete_hazard_type_ids
      );
    }
    if (req.body.add_hazard_type_ids) {
      req.body.add_hazard_type_ids = JSON.parse(req.body.add_hazard_type_ids);
    }

    if (req.body.delete_exposure_route_ids) {
      req.body.delete_exposure_route_ids = JSON.parse(
        req.body.delete_exposure_route_ids
      );
    }
    if (req.body.add_exposure_route_ids) {
      req.body.add_exposure_route_ids = JSON.parse(
        req.body.add_exposure_route_ids
      );
    }

    if (req.body.delete_protective_equipment_ids) {
      req.body.delete_protective_equipment_ids = JSON.parse(
        eq.body.delete_protective_equipment_ids
      );
    }
    if (req.body.add_protective_equipment_ids) {
      req.body.add_protective_equipment_ids = JSON.parse(
        req.body.add_protective_equipment_ids
      );
    }

    if (req.body.delete_substance_disposal_type_ids) {
      req.body.delete_substance_disposal_type_ids = JSON.parse(
        req.body.delete_substance_disposal_type_ids
      );
    }
    if (req.body.add_substance_disposal_type_ids) {
      req.body.add_substance_disposal_type_ids = JSON.parse(
        req.body.add_substance_disposal_type_ids
      );
    }

    if (req.body.delete_risk_person_ids) {
      await asyncForEach(req.body.delete_risk_person_ids, async (id) => {
        await CoshhAssessmentRiskPerson.destroy({
          where: { assessment_id: assessmentId, risk_person_id: id },
        });
      });
    }
    if (req.body.delete_classification_ids) {
      await asyncForEach(req.body.delete_classification_ids, async (id) => {
        await CoshhAssessmentClassification.destroy({
          where: { assessment_id: assessmentId, classification_id: id },
        });
      });
    }
    if (req.body.delete_hazard_type_ids) {
      await asyncForEach(req.body.delete_hazard_type_ids, async (id) => {
        await CoshhAssessmentHazardType.destroy({
          where: { assessment_id: assessmentId, hazard_type_id: id },
        });
      });
    }
    if (req.body.delete_exposure_route_ids) {
      await asyncForEach(req.body.delete_exposure_route_ids, async (id) => {
        await CoshhAssessmentExposureRoute.destroy({
          where: { assessment_id: assessmentId, exposure_route_id: id },
        });
      });
    }
    if (req.body.delete_protective_equipment_ids) {
      await asyncForEach(
        req.body.delete_protective_equipment_ids,
        async (id) => {
          await CoshhAssessmentProtectiveEquipment.destroy({
            where: { assessment_id: assessmentId, protective_equipment_id: id },
          });
        }
      );
    }
    if (req.body.delete_substance_disposal_type_ids) {
      await asyncForEach(
        req.body.delete_substance_disposal_type_ids,
        async (id) => {
          await CoshhAssessmentSubstanceDisposalType.destroy({
            where: {
              assessment_id: assessmentId,
              substance_disposal_type_id: id,
            },
          });
        }
      );
    }

    if (req.body.add_risk_person_ids) {
      const assessmentRiskPersons = req.body.add_risk_person_ids.map((id) => {
        return {
          assessment_id: assessmentId,
          risk_person_id: id,
        };
      });
      await CoshhAssessmentRiskPerson.bulkCreate(assessmentRiskPersons);
    }

    if (req.body.add_classification_ids) {
      const assessmentClassifications = req.body.add_classification_ids.map(
        (id) => {
          return {
            assessment_id: assessmentId,
            classification_id: id,
          };
        }
      );
      await CoshhAssessmentClassification.bulkCreate(assessmentClassifications);
    }

    if (req.body.add_hazard_type_ids) {
      const assessmentHazardTypes = req.body.add_hazard_type_ids.map((id) => {
        return {
          assessment_id: assessmentId,
          hazard_type_id: id,
          other_description: id === 8 ? req.body.other_hazard_type : null,
        };
      });
      await CoshhAssessmentHazardType.bulkCreate(assessmentHazardTypes);
    }

    if (req.body.add_exposure_route_ids) {
      const assessmentExposureRoutes = req.body.add_exposure_route_ids.map(
        (id) => {
          return {
            assessment_id: assessmentId,
            exposure_route_id: id,
            other_description: id === 5 ? req.body.other_exposure_route : null,
          };
        }
      );
      await CoshhAssessmentExposureRoute.bulkCreate(assessmentExposureRoutes);
    }

    if (req.body.add_protective_equipment_ids) {
      const assessmentProtectiveEquipments =
        req.body.add_protective_equipment_ids.map((id) => {
          return {
            assessment_id: assessmentId,
            protective_equipment_id: id,
            other_description:
              id === 8 ? req.body.other_protective_equipment : null,
          };
        });
      await CoshhAssessmentProtectiveEquipment.bulkCreate(
        assessmentProtectiveEquipments
      );
    }

    if (req.body.add_substance_disposal_type_ids) {
      const assessmentSubstanceDisposalTypes =
        req.body.add_substance_disposal_type_ids.map((id) => {
          return {
            assessment_id: assessmentId,
            substance_disposal_type_id: id,
            other_description:
              id === 4 ? req.body.other_substance_disposal_type : null,
          };
        });

      await CoshhAssessmentSubstanceDisposalType.bulkCreate(
        assessmentSubstanceDisposalTypes
      );
    }

    if (req.body.hazard_type_ids && req.body.hazard_type_ids.includes(8)) {
      CoshhAssessmentHazardType.update(
        {
          other_description: req.body.other_hazard_type,
        },
        {
          where: { assessment_id: assessmentId, hazard_type_id: 8 },
        }
      );
    }
    if (
      req.body.exposure_route_ids &&
      req.body.exposure_route_ids.includes(5)
    ) {
      CoshhAssessmentExposureRoute.update(
        {
          other_description: req.body.other_exposure_route,
        },
        {
          where: { assessment_id: assessmentId, exposure_route_id: 5 },
        }
      );
    }
    if (
      req.body.protective_equipment_ids &&
      req.body.protective_equipment_ids.includes(8)
    ) {
      CoshhAssessmentProtectiveEquipment.update(
        {
          other_description: req.body.other_protective_equipment,
        },
        {
          where: { assessment_id: assessmentId, protective_equipment_id: 8 },
        }
      );
    }
    if (
      req.body.substance_disposal_type_ids &&
      req.body.substance_disposal_type_ids.includes(4)
    ) {
      CoshhAssessmentSubstanceDisposalType.update(
        {
          other_description: req.body.other_substance_disposal_type,
        },
        {
          where: { assessment_id: assessmentId, substance_disposal_type_id: 4 },
        }
      );
    }
    await CoshhAssessment.update(req.body, {
      where: { id: assessmentId },
    });

    const assessment = await CoshhAssessment.findOne({
      where: { id: assessmentId },
      include: assessmentIncludes,
    });

    res.status(201).send({
      message: "Assessment updated successfully.",
      data: assessment,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

module.exports = {
  getRiskPersons,
  getClassifications,
  getExposureRoutes,
  getHazardTypes,
  getProtectiveEquipments,
  getSubstancesDisposalTypesPersons,
  getRiskRatings,
  index,
  getAssessmentDetail,
  addAssessment,
  updateAssessment,
};
