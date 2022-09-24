const express = require("express");
const userController = require("../controllers/user.controller");

const { checkAuth } = require("../middlewares/middlewares");

const router = express.Router();

router.post("/add", checkAuth, userController.addUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", checkAuth, userController.profile);
router.get("/", checkAuth, userController.index);
router.get("/all", checkAuth, userController.getAllUsers);
router.get("/detail/:id", checkAuth, userController.getUserById);
router.patch("/update/:id", checkAuth, userController.updateUser);

module.exports = router;
