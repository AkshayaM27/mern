const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mfaSecret: { type: String }, // Stores MFA secret key
  isMFAEnabled: { type: Boolean, default: false } // Checks if MFA is enabled
});

module.exports = mongoose.model("User", UserSchema);
