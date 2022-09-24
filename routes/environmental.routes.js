const express = require("express");
const environmentalController = require("../controllers/environmental.controller");
const { checkAuth, protectedRoute } = require("../middlewares/middlewares");

const router = express.Router();

router.get(
  "/probabilities",
  checkAuth,
  environmentalController.getEnvironmentalProbabilities
);
router.get(
  "/severities",
  checkAuth,
  environmentalController.getEnvironmentalSeverities
);
router.get(
  "/activities",
  checkAuth,
  environmentalController.getEnvironmentalActivities
);
router.post(
  "/add-activity",
  checkAuth,
  environmentalController.addEnvironmentalActivity
);
router.get("/", checkAuth, environmentalController.index);
router.post("/", checkAuth, environmentalController.addRecord);
router.get("/:id", checkAuth, environmentalController.getRecordDetail);
router.post(
  "/:id/add-assessment",
  checkAuth,
  environmentalController.addAssessment
);
router.post(
  "/:recordId/add-measurement/:assessmentId",
  checkAuth,
  environmentalController.addMeasurement
);
router.patch(
  "/:recordId/update-assessment/:assessmentId",
  checkAuth,
  environmentalController.updateAssessment
);
module.exports = router;
