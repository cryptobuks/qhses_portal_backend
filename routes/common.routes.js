const express = require("express");
const commonController = require("../controllers/common.controller");
const { checkAuth } = require("../middlewares/middlewares");

const router = express.Router();

router.get("/roles", commonController.getRoles);
router.get("/employees", commonController.getEmployees);
router.get("/companies", commonController.getCompanies);
router.get("/companies/user", checkAuth, commonController.getUserCompanies);
router.get("/years", commonController.getYears);
router.get("/quaters", commonController.getQuaters);
router.get("/aspects", commonController.getAspects);

router.get("/departments", commonController.getDepartments);
router.get("/areas", commonController.getAreas);
router.get("/sources", commonController.getSources);
router.get("/categories", commonController.getCategories);
router.get("/nc-types", commonController.getNCTypes);
router.get("/management-systems", commonController.getManagementSystems);
router.get("/statuses", commonController.getStatuses);
router.get("/months", commonController.getMonths);
router.get("/audit-findings", commonController.getAuditFindinds);
router.get("/ncr-by-month", commonController.getNcrByMonths);
router.get("/ncr-by-department", commonController.getNcrByDepartment);
router.get("/ncr-by-status", commonController.getNcrByStatus);
router.get("/ncr-by-status-and-month", commonController.getNcrByStatusAndMonth);
router.get("/ncr-by-company", checkAuth, commonController.getNcrByCompany);

router.get("/frequencies", commonController.getCalibrationFrequencies);
router.get(
  "/due-calibration-by-month",
  commonController.getDueCalibationsByMonth
);
router.get(
  "/calibration-by-frequency",
  commonController.getCalibrationsByFrequency
);

router.get("/audit-statuses", commonController.getAuditStatuses);
router.get("/finding-types", commonController.getFindingTypes);
router.get("/locations", commonController.getLocations);
router.post("/add-location", commonController.addLocation);
router.get("/emergency-drill-types", commonController.getEmergencyDrillTypes);
router.get("/face-terminals", commonController.getFaceTerminals);

module.exports = router;
