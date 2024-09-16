const User = require("../model/User");
const bcrypt = require("bcrypt");
const { default: isThisQuarter } = require("date-fns/isThisQuarter/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and pawssword are required" });
  const foundUser = await User.findOne({ email: user }).exec();
  if (!foundUser) return res.sendStatus(401); //unauthorized
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    //create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      fullName: foundUser.fullName,
      roles,
      accessToken,
      id: foundUser._id,
    });
  } else {
    return res.sendStatus(401); //unauthorized
  }
};

module.exports = { handleLogin };
