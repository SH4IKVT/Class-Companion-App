const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  question: String,
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reply: String,
  answeredBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Doubt", doubtSchema);
