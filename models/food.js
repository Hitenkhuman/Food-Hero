const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Restaurant = require("./restaurant");
const moment = require("moment");
const ngo = require("./ngo");
const tomorrow = moment().add(1, "day").toDate();
const foodSchema = new mongoose.Schema({
  res_id: {
    type: Schema.Types.ObjectId,
    ref: Restaurant,
  },
  ngo_id: {
    type: Schema.Types.ObjectId,
    ref: ngo,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  discription: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    default: "Veg",
  },
  no_of_dishes: {
    type: Number,
    default: 5,
  },
  status: {
    type: String,
    default: "Available",
  },
  due_time: {
    type: Date,
    require: true,
    default: tomorrow,
  },
});
module.exports = Food = mongoose.model("Food", foodSchema);
