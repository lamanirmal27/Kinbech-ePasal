const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
 
  shipping_detail:{
    type: Object
  }
});

module.exports = mongoose.model("User", userSchema);
