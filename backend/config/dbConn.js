const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      tlsAllowInvalidCertificates: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
