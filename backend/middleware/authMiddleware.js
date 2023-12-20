const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Log = require("../models/logModel");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      Log.createLog(Date(), "ERROR", "No token found", req.ip);

      return res.status(401).json({ message: "Authorization required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      Log.createLog(Date(), "ERROR", "User not found", req.ip);

      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    Log.createLog(Date(), "ERROR", error, req.ip);

    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;
