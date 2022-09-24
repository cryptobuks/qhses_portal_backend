const express = require("express");
const applicationController = require("../controllers/application.controller");
const { checkAuth } = require("../middlewares/middlewares");

const router = express.Router();

router.get("/user", checkAuth, applicationController.getUserApplications);
router.get("/all", checkAuth, applicationController.getAllApplications);
router.get(
  "/menu-by-id/:id",
  checkAuth,
  applicationController.getApplicationMenuById
);
router.get(
  "/menu-by-route/:route",
  checkAuth,
  applicationController.getApplicationMenuByRoute
);
router.get(
  "/by-route/:route",
  checkAuth,
  applicationController.getApplicationByRoute
);
router.get(
  "/menu/user/:route",
  checkAuth,
  applicationController.getUserApplicationMenuByRoute
);
router.get(
  "/role/user/:route",
  checkAuth,
  applicationController.getUserApplicationRoleByRoute
);

module.exports = router;
