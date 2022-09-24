const express = require("express");
const multer = require("multer");
const path = require("path");
const recordController = require("../controllers/ncrRecord.controller");
const { checkAuth, protectedRoute } = require("../middlewares/middlewares");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/files/ncr_documents");
  },
  filename: (req, file, callback) => {
    console.log(file);
    console.log(
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
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
  protectedRoute(["USER", "ADMIN", "HSE_COORDINATOR"]),
  recordController.index
);
router.post(
  "/",
  upload.array("documents"),
  checkAuth,
  protectedRoute(["USER", "ADMIN", "HSE_COORDINATOR"]),
  recordController.addRecord
);
router.patch(
  "/update/:recordId",
  upload.array("documents"),
  checkAuth,
  protectedRoute(["USER", "ADMIN", "HSE_COORDINATOR"]),
  recordController.updateRecord
);
router.patch(
  "/update-action/:recordId/:actionId",
  upload.array("documents"),
  checkAuth,
  protectedRoute(["USER", "ADMIN", "HSE_COORDINATOR"]),
  recordController.updateActionPlan
);
router.patch(
  "/update-closed-out-date/:id",
  checkAuth,
  protectedRoute(["USER", "ADMIN", "HSE_COORDINATOR"]),
  recordController.updateClosedOutDate
);
router.patch(
  "/update-remarks/:id",
  checkAuth,
  protectedRoute(["USER", "ADMIN", "HSE_COORDINATOR"]),
  recordController.updateRemarks
);
router.patch(
  "/update-verification/:id",
  checkAuth,
  protectedRoute(["HSE_COORDINATOR", "ADMIN"]),
  recordController.updateVerification
);
router.patch(
  "/update-status/:id",
  checkAuth,
  protectedRoute(["HSE_COORDINATOR", "ADMIN"]),
  recordController.updateStatus
);
router.get("/:id", recordController.show);
router.patch("/:id", recordController.update);
router.delete("/:id", recordController.destroy);
router.get(
  "/check/action-plans-target-date",
  recordController.checkActionPlansTargetDate
);
router.get("/get/all", recordController.getAllRecords);

module.exports = router;
