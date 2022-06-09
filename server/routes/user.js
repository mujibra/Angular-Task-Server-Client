const express = require("express");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/auth");
const { getAccess } = require("../middlewares/authorization");
const router = express.Router();

router.get("/list", UserController.userList);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// router.use(authentication);
router.get("/histories", UserController.history);
router.get("/detail/:id", UserController.userById);
router.put("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);

module.exports = router;
