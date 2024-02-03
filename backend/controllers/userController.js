const User = require("../models/userModel");
const Log = require("../models/logModel");
const jwt = require("jsonwebtoken");

// Function to create a token
function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// Function to handle errors
function handleError(res, statusCode, errorMessage) {
  Log.createLog(Date(), "ERROR", errorMessage, res.req.ip);

  res.status(statusCode).json({ message: errorMessage });
}

// Function to create a new user
const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);
    const token = createToken(user._id);

    Log.createLog(Date(), "INFO", `New user ${req.body.email} created`, req.ip);

    res.status(200).json({ email, token });
  } catch (err) {
    handleError(res, 500, err.message);
  }
};

// Function to log in a suer
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    Log.createLog(Date(), "INFO", `User ${req.body.email} logged in`, req.ip);

    res.status(200).json({ email, token });
  } catch (err) {
    handleError(res, 401, "Invalid credentials");
  }
};

// Function to update user information
const updateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await User.updateUser(req.user._id, email, password);

    Log.createLog(Date(), "INFO", `User ${req.body.email} updated`, req.ip);

    res.status(200).json({ email });
  } catch (err) {
    handleError(res, 500, "Failed to update user");
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    const user = req.user;

    await User.deleteUser(req.user._id);

    Log.createLog(Date(), "INFO", `User ${user.email} deleted`, req.ip);

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    handleError(res, 500, "Failed to delete user");
  }
};

// Function to get user information
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    Log.createLog(Date(), "INFO", `User ${user.email} retrieved`, req.ip);

    res.status(200).json({ user });
  } catch (err) {
    handleError(res, 500, "Failed to get user");
  }
};

// Temporary function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    Log.createLog(Date(), "INFO", `All users retrieved`, req.ip);

    res.status(200).json({ users });
  } catch (err) {
    handleError(res, 500, "Failed to get users");
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
