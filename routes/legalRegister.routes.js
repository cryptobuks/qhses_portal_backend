const express = require("express");
const legalRegisterController = require("../controllers/legalRegister.controller");
const { checkAuth, protectedRoute } = require("../middlewares/middlewares");

const router = express.Router();

router.get("/", checkAuth, legalRegisterController.index);
router.get("/:id", checkAuth, legalRegisterController.getRegisterRecordDetail);
router.post("/", checkAuth, legalRegisterController.addLegalRegisterRecord);
router.patch("/", checkAuth, legalRegisterController.updateLegalRegisterRecord);
router.post(
  "/:id/add-review",
  checkAuth,
  legalRegisterController.addLegalRegisterRecordQuarterReview
);
module.exports = router;
