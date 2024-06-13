const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrefSchema = new Schema({
  prefDesc: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prefWeight: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
});

const SinglePrefSchema = mongoose.model("SinglePrefSchema", PrefSchema);
module.exports = SinglePrefSchema;
