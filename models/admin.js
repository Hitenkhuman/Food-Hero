const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});
module.exports = Admin = mongoose.model("Admin", adminSchema);
