const express = require("express");
const { checkAuth } = require("../middlewares/middlewares");
const surveyController = require("../controllers/survey.controller");

const router = express.Router();

router.get("/", checkAuth, surveyController.index);
router.get("/:id", checkAuth, surveyController.surveyDetail);
router.post("/add", checkAuth, surveyController.addSurvey);
router.patch("/update/:id", checkAuth, surveyController.updateSurvey);
router.post("/add-feedback/:id", checkAuth, surveyController.addSurveyFeedback);
router.get(
  "/reminder/:surveyId/:surveyUserId",
  checkAuth,
  surveyController.sendSurveyReminderToUser
);
router.post(
  "/rating-by-company-year",
  checkAuth,
  surveyController.getRatingsByUserCompanyAndYear
);
router.post(
  "/rating-by-aspect-year",
  checkAuth,
  surveyController.getRatingByQuestionAspectAndYear
);
router.post(
  "/rating-by-company-year-aspect",
  checkAuth,
  surveyController.getRatingsByUserCompanyYearAndAspect
);
router.get(
  "/get-surveys-data/all",
  checkAuth,
  surveyController.getAllSurveysData
);

module.exports = router;
