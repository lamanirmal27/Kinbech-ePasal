const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createNewUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
