const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userPreferencesSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prefs: {
    type: [
      {
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
      },
    ],
    required: true,
  },
});

const UserPrefs = mongoose.model("UserPrefs", userPreferencesSchema);
module.exports = UserPrefs;
