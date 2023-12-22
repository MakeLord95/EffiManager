const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateNewToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const tokenRefresh = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id);

      if (user) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const tokenExpiration = decoded.exp;

        // Check if remaining time is less than 15 minutes (900 seconds)
        if (tokenExpiration - currentTimestamp < 900) {
          const refreshedToken = generateNewToken(user._id);
          res.setHeader("Authorization", `Bearer ${refreshedToken}`);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  next();
};

module.exports = tokenRefresh;
