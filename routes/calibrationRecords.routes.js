const express = require("express");
const multer = require("multer");
const path = require("path");
const recordController = require("../controllers/calibrationRecord.controller");
const { checkAuth, protectedRoute } = require("../middlewares/middlewares");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/files/equipment_certifications");
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

router.get(
  "/",
  checkAuth,
  // protectedRoute(["USER", "ADMIN"]),
  recordController.index
);
router.post(
  "/",
  upload.single("certification_attachment"),
  checkAuth,
  // protectedRoute(["USER", "ADMIN"]),
  recordController.addRecord
);
router.get(
  "/:id",
  checkAuth,
  // protectedRoute(["USER", "ADMIN"]),
  recordController.show
);
router.patch(
  "/update/:id",
  upload.single("certification_attachment"),
  checkAuth,
  protectedRoute(["USER", "ADMIN"]),
  recordController.updateRecord
);
router.get("/check/due-date", recordController.checkCalibrationDueDate);
router.get("/get/all", recordController.getAllCalibratioRecords);

module.exports = router;
