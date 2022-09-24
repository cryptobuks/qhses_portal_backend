const express = require("express");
const multer = require("multer");
const path = require("path");
const { checkAuth } = require("../middlewares/middlewares");
const auditController = require("../controllers/audit.controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/files/audit_documents");
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

router.get("/", checkAuth, auditController.index);
router.get("/:id", checkAuth, auditController.getAuditById);
router.post("/add", checkAuth, auditController.addAudit);
router.patch("/update/:id", checkAuth, auditController.updateAudit);
router.post(
  "/:id/notification/add",
  upload.array("documents"),
  checkAuth,
  auditController.addAuditNotification
);
router.post("/:id/checklist/add", checkAuth, auditController.addAuditChecklist);
router.patch(
  "/:auditId/checklist/:auditChecklistId",
  checkAuth,
  auditController.updateAuditChecklist
);
router.delete(
  "/:auditId/checklist/:auditChecklistId",
  checkAuth,
  auditController.deleteAuditChecklist
);
router.patch(
  "/:auditId/submit",
  checkAuth,
  auditController.submitAuditChecklist
);
router.patch("/:auditId/complete", checkAuth, auditController.completeAudit);
router.post(
  "/:auditId/copy-checklist",
  checkAuth,
  auditController.copyAuditChecklist
);
router.get("/reminders/send", auditController.sendAuditReminder);

module.exports = router;
