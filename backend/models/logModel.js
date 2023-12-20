const mongoose = require("mongoose");

// Log schema
const logSchema = mongoose.Schema({
  timeStamp: {
    type: Date,
    required: true,
  },
  logLevel: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
});

logSchema.statics.createLog = async function (
  timeStamp,
  logLevel,
  message,
  ipAddress
) {
  try {
    const log = await this.create({
      timeStamp,
      logLevel,
      message,
      ipAddress,
    });

    console.log(timeStamp, logLevel, message, ipAddress);

    return log;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("Log", logSchema);
