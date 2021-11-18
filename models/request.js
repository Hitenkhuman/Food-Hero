const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const food = require("./food");
const ngo = require("./ngo");
const restaurant = require("./restaurant");
const requestSchema = new mongoose.Schema({
  ngo_id: {
    type: Schema.Types.ObjectId,
    ref: ngo,
  },
  food_id: {
    type: Schema.Types.ObjectId,
    ref: food,
  },
  res_id: {
    type: Schema.Types.ObjectId,
    ref: restaurant,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  request_status: {
    type: String,
    default: "Pending",
  },
});
module.exports = Request = mongoose.model("Request", requestSchema);
