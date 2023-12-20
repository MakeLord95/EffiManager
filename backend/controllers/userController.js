const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Function to create a token
function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

// Capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Function to handle errors
function handleError(res, statusCode, errorMessage) {
  console.error(errorMessage);
  res.status(statusCode).json({ error: errorMessage });
}

// Function to create a new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const capitalizedName = capitalize(name);
    const user = await User.register(capitalizedName, email, password);
    const token = createToken(user._id);

    res.status(200).json({ name: capitalizedName, token });
  } catch (err) {
    handleError(res, 500, err.message);
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ name: user.name, token });
  } catch (err) {
    handleError(res, 401, "Invalid credentials");
  }
};

// Function to update user information
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const capitalizedName = capitalize(name);
    await User.updateUser(req.user._id, capitalizedName, email, password);
    res.status(200).json({ name: capitalizedName });
  } catch (err) {
    handleError(res, 500, "Failed to update user");
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.user._id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    handleError(res, 500, "Failed to delete user");
  }
};

// Get user information
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user });
  } catch (err) {
    handleError(res, 500, "Failed to get user");
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
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
