const express = require("express");
const hiraController = require("../controllers/hira.controller");
const { checkAuth, protectedRoute } = require("../middlewares/middlewares");

const router = express.Router();

router.get("/probabilities", checkAuth, hiraController.getHiraProbabilities);
router.get("/severities", checkAuth, hiraController.getHiraSeverities);
router.get("/entities", checkAuth, hiraController.getHiraEntities);
router.get("/hazards", checkAuth, hiraController.getHiraHazards);
router.post("/add-hazard", checkAuth, hiraController.addHiraHazard);
router.get("/", checkAuth, hiraController.index);
router.post("/", checkAuth, hiraController.addRecord);
router.get("/:id", checkAuth, hiraController.getRecordDetail);
router.post("/:id/add-assessment", checkAuth, hiraController.addAssessment);
router.post(
  "/:recordId/add-measurement/:assessmentId",
  checkAuth,
  hiraController.addMeasurement
);
router.patch(
  "/:recordId/update-assessment/:assessmentId",
  checkAuth,
  hiraController.updateAssessment
);
module.exports = router;
