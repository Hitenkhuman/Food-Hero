const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Restaurant = require("./restaurant");
const moment = require("moment");
const ngo = require("./ngo");
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
  description: {
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
  food_status: {
    type: String,
    default: "Available",
  },
  pickup_time: {
    type: String,
  },
  requests: [
    {
      type: Schema.Types.ObjectId,
      default: null,
    },
  ],
  note: {
    type: String,
  },
  pickup_address: {
    type: String,
    default: "Same as Restaurant's Address",
  },
  city: {
    type: String,
  },
});
module.exports = Food = mongoose.model("Food", foodSchema);
