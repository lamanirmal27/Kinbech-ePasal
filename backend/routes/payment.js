const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router
  .post("/", paymentController.initiatePayment)
  .get("/", paymentController.completePayment)
  .get("/status", paymentController.getAllPayments)
  .post("/delivery", paymentController.deliveryCheck)
  .put("/:id", paymentController.updatePayment);
module.exports = router;
