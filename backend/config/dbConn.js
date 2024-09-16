const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
// const uri =
//   "";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   tlsAllowInvalidCertificates: true,
// });

const connectDB = async () => {
  try {
    // await client.connect();
    // console.log("true");
    await mongoose.connect(process.env.DATABASE_URI, {tlsAllowInvalidCertificates:true});
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
