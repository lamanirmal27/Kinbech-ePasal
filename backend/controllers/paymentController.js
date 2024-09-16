const axios = require("axios");
const crypto = require("crypto");
const https = require("https");
const Payment = require("../model/PaymentSchema");
const User = require("../model/User");
require("dotenv").config();
let payload = {};

const setUserAddress = async (customer_info, shipping_address) => {
  // const { customer_info, shipping_address } = payload;
  // console.log(payload);
  const { phone, userId } = customer_info;
  const { address, district } = shipping_address;
  if (!userId) {
    throw new Error("User ID is missing.");
  }

  try {
    const foundUser = await User.findOne({ _id: userId }).exec();

    if (!foundUser) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    // Update shipping details
    foundUser.shipping_detail = { phone, address, district };

    // Save the updated user document
    await foundUser.save();
  } catch (error) {
    // Handle the error (e.g., log it, return a response to the client, etc.)
    console.error("Error updating shipping details:", error);
    throw error;
  }
};

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Add this line
});

const initiatePayment = async (req, res) => {
  payload = req.body;
  const { customer_info } = payload;
  console.log(customer_info);
  const khaltiResponse = await axiosInstance.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
  );
  // console.log(khaltiResponse);
  if (khaltiResponse) {
    res.json({
      success: true,
      data: khaltiResponse?.data,
    });
  } else {
    res.json({
      success: false,
      message: "Something's wrong I can feel it",
    });
  }
};

async function verifyPayment(pidx) {
  try {
    let headerList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    };
    let bodyContent = JSON.stringify({
      pidx,
    });

    let reqOptions = {
      url: `https://a.khalti.com/api/v2/epayment/lookup/`,
      method: "POST",
      headers: headerList,
      data: bodyContent,
    };

    let response = await axiosInstance.request(reqOptions);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const completePayment = async (req, res) => {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;

  try {
    const paymentInfo = await verifyPayment(pidx);
    // console.log(paymentInfo);

    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete information",
        paymentInfo,
      });
    }
    const { customer_info, shipping_address } = payload;

    const paymentData = await Payment.create({
      customerInfo: customer_info,
      shippingAddress: shipping_address,
      purchasedItem: purchase_order_name,
      transactionId: transaction_id,
      pidx: pidx,
      productId: purchase_order_id,
      amount,
      dataFromVerificationReq: paymentInfo,
      paymentGateway: "khalti",
      status: "success",
      paymentDate: new Date(),
    });

    await setUserAddress(customer_info, shipping_address);

    res.json({
      success: true,
      message: "Payment Successful",
      paymentData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error,
    });
  }
};

const deliveryCheck = async (req, res) => {
  let payload = req.body;
  const paymentData = await Payment.create({
    customerInfo: payload?.customer_info,
    shippingAddress: payload?.shipping_address,
    pidx: crypto.randomBytes(5).toString("hex"),
    productId: payload?.purchase_order_id,
    amount: payload?.amount,
    purchasedItem: payload?.purchase_order_name,
    dataFromVerificationReq: {},
    paymentGateway: "Delivery",
    status: "pending",
    paymentDate: new Date(),
  });
  await setUserAddress(payload?.customer_info, payload?.shipping_address);
  res.json({
    success: true,
    message: "Order Successful",
    paymentData,
  });
};

const getAllPayments = async (req, res) => {
  const payments = await Payment.find();
  if (!payments) {
    res.status(204).json({ message: "No payments found" });
  }
  res.json(payments);
};

const updatePayment = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  // Validate request parameters
  if (!id) {
    return res
      .status(400)
      .json({ message: "Payment ID parameter is required." });
  }

  // Find the payment by ID
  try {
    const payment = await Payment.findOne({ productId: id }).exec();
    if (!payment) {
      return res
        .status(404)
        .json({ message: `No payment found for ID: ${id}` });
    }

    if (payment.status === "success") {
      return res.status(400).json({
        message: "Cannot change the status of the successfull payment",
      });
    }

    // Update the payment status
    payment.status = status || payment.status; // Update only if a new status is provided
    const result = await payment.save();

    // Send the updated payment data
    res.json({
      message: "Payment status updated successfully",
      payment: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating payment status" });
  }
};

module.exports = {
  initiatePayment,
  completePayment,
  getAllPayments,
  deliveryCheck,
  updatePayment,
};
