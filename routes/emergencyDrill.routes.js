const express = require("express");
const multer = require("multer");
const path = require("path");
const { checkAuth } = require("../middlewares/middlewares");
const EmergencyDrillController = require("../controllers/emergencyDrill.controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/files/emergency_drill_attachments");
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

router.get("/", checkAuth, EmergencyDrillController.index);
router.get("/:id", checkAuth, EmergencyDrillController.getEmergencyDrillById);
router.post("/add", checkAuth, EmergencyDrillController.addEmergencyDrill);
router.post(
  "/:id/notification/add",
  checkAuth,
  EmergencyDrillController.addEmergencyDrillNotification
);
router.get(
  "/:id/employee-attendence",
  checkAuth,
  EmergencyDrillController.getEmployeeAttendenceDataByDrillLocation
);
router.post(
  "/:id/save-employee-attendence",
  checkAuth,
  EmergencyDrillController.saveEmployeesAttendence
);
router.post(
  "/:id/submit-employee-attendence",
  checkAuth,
  EmergencyDrillController.submitEmployeesAttendence
);
router.patch(
  "/:id/update",
  upload.array("attachments"),
  checkAuth,
  EmergencyDrillController.updateEmergencyDrill
);

module.exports = router;
