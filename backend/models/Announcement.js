const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'date',   // auto-set `date` on creation
      updatedAt: false     // we don’t need updatedAt
    }
  }
);

module.exports = mongoose.model('Announcement', announcementSchema);
