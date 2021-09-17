const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const food = require("./food");
const ngo = require("./ngo");
const requestSchema = new mongoose.Schema({
  ngo_id: {
    type: Schema.Types.ObjectId,
    ref: ngo,
    dropDups: true,
    unique: true,
  },
  food_id: {
    type: Schema.Types.ObjectId,
    ref: food,
    dropDups: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    default: "Pending",
  },
});
module.exports = Request = mongoose.model("Request", requestSchema);
