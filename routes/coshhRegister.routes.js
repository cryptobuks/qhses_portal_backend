const express = require("express");
const multer = require("multer");
const path = require("path");
const coshhRegisterController = require("../controllers/coshhRegister.controller");
const { checkAuth, protectedRoute } = require("../middlewares/middlewares");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/files/coshh_documents");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

var upload = multer({
  storage: storage,
});

router.get("/risk-persons", checkAuth, coshhRegisterController.getRiskPersons);
router.get(
  "/classifications",
  checkAuth,
  coshhRegisterController.getClassifications
);
router.get(
  "/exposure-routes",
  checkAuth,
  coshhRegisterController.getExposureRoutes
);
router.get("/hazard-types", checkAuth, coshhRegisterController.getHazardTypes);
router.get(
  "/protective-equipments",
  checkAuth,
  coshhRegisterController.getProtectiveEquipments
);
router.get(
  "/substances-disposal-types",
  checkAuth,
  coshhRegisterController.getSubstancesDisposalTypesPersons
);
router.get("/risk-ratings", checkAuth, coshhRegisterController.getRiskRatings);
router.get("/", checkAuth, coshhRegisterController.index);
router.get("/:id", checkAuth, coshhRegisterController.getAssessmentDetail);
router.post(
  "/",
  upload.single("document"),
  checkAuth,
  coshhRegisterController.addAssessment
);
router.patch(
  "/:id",
  upload.single("document"),
  checkAuth,
  coshhRegisterController.updateAssessment
);

module.exports = router;
