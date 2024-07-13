const axios = require("axios");
const https = require("https");
require("dotenv").config();

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Add this line
});

const handlePayment = async (req, res) => {
  const payload = req.body;
  const khaltiResponse = await axiosInstance.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
  );
  console.log(khaltiResponse);
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

module.exports = { handlePayment };
