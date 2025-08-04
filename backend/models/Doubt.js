const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  replies: [
    {
      message: {
        type: String,
        required: true,
      },
      repliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Doubt", doubtSchema);
