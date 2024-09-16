const User = require("../model/User");

const handleLogout = async (req, res) => {
  //onclient also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    console.log("No JWT found in cookies");
    return res.sendStatus(204); // no content
  }
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }
  //delete the refresh token from DB
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); //secure: true; --only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
