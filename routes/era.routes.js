const express = require("express");
const eraController = require("../controllers/era.controller");
const { checkAuth, protectedRoute } = require("../middlewares/middlewares");

const router = express.Router();

router.get("/likelihoods", checkAuth, eraController.getEraLikelihoods);
router.get("/consequences", checkAuth, eraController.getEraConsequences);
router.get("/actions", checkAuth, eraController.getEraActions);
router.get("/statuses", checkAuth, eraController.getEraStatuses);
router.get("/", checkAuth, eraController.index);
router.get("/:id", checkAuth, eraController.getAssessmentDetail);
router.post("/", checkAuth, eraController.addRiskAssessment);
router.patch("/", checkAuth, eraController.updateAssessment);
router.patch("/close-assessment", checkAuth, eraController.closeAssessment);
module.exports = router;
