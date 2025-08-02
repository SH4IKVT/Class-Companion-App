const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  subject:    { type: String, required: true },
  dueDate:    { type: Date, required: true },
  fileUrl:    { type: String, required: true },
  uploader: {
    id:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    role: { type: String, enum: ["student","teacher"], required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Assignment", assignmentSchema);
