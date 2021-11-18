const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
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
    default: "default.png",
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
  city: {
    type: String,
  },
  address: {
    type: String,
    require: true,
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
  reports: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
});
//restaurantSchema.index({ email: 1, mobile: 1 }, { unique: true });
module.exports = Restaurant = mongoose.model("Restaurant", restaurantSchema);
