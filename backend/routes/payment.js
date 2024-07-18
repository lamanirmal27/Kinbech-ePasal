const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router
  .post("/", paymentController.initiatePayment)
  .get("/", paymentController.completePayment)
  .get("/status", paymentController.getAllPayments)
  .post("/delivery", paymentController.deliveryCheck);

module.exports = router;
