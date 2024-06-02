const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    console.log("No JWT found in cookies");
    return res.sendStatus(401); // Unauthorized
  }
  console.log("JWT found:", cookies.jwt);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    console.log("No user found with this refresh token");
    return res.sendStatus(403); // Forbidden
  }

  // Evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("Error verifying JWT:", err);
      return res.sendStatus(403); // Forbidden
    }
    if (foundUser.username !== decoded.username) {
      console.log("Token username does not match found user");
      return res.sendStatus(403); // Forbidden
    }

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    console.log("Access token created:", accessToken);
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
