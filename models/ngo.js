const mongoose = require("mongoose");
const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  certificate_number: {
    type: String,
    require: true,
    unique: true,
  },
  mobile: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  imgurl: {
    type: String,
    require: true,
    default: "ngo.png",
  },
  opening_time: {
    type: String,
    require: true,
  },
  closing_time: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
  },
  devicetoken: {
    type: String,
    require: true,
    unique: true,
  },
  authid: {
    type: String,
    require: true,
    unique: true,
  },
  joindate: {
    type: Date,
    default: Date.now,
  },
  verification_status: {
    type: String,
    default: "Pending",
  },
  reports: {
    type: Number,
    default: 0,
  },
});
//ngoSchema.index({ email: 1, mobile: 1 }, { unique: true });
module.exports = Ngo = mongoose.model("ngo", ngoSchema);
