const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// User schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      maxlength: 32,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

// Reusable validation function
const validateUserData = (name, email, password) => {
  if (!validator.isAlpha(name)) {
    throw new Error("Name can only contain letters");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    );
  }
};

// Sign up user
userSchema.statics.register = async function (name, email, password) {
  validateUserData(name, email, password);

  try {
    if (await this.findOne({ email })) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

// Login user
userSchema.statics.login = async function (email, password) {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (err) {
    console.log(err);
  }
};

// Update user
userSchema.statics.updateUser = async function (id, name, email, password) {
  validateUserData(name, email, password);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: hashedPassword,
      },
      { new: true }
    );

    return user;
  } catch (err) {
    console.log(err);
  }
};

// Delete user
userSchema.statics.deleteUser = async function (id) {
  try {
    const user = await this.findByIdAndDelete(id);
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("User", userSchema);
