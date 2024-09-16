const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createNewUser)
  .delete(userController.deleteUser);
router
  .route("/:id")
  .get(userController.getUserData)
  .put(userController.updateRoles);
module.exports = router;
