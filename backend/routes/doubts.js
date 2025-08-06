const express = require("express");
const router = express.Router();
const Doubt = require("../models/Doubt");
const verifyJwt = require("../middleware/verifyJwt");
const sendNotification = require("../lib/sendNotification");

// Get all doubts (for all users)
router.get("/", verifyJwt, async (req, res) => {
  try {
    const doubts = await Doubt.find()
      .sort({ createdAt: -1 })
      .populate("askedBy", "email")
      .populate("replies.repliedBy", "email");
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doubts" });
  }
});

// Post a new doubt
router.post("/", verifyJwt, async (req, res) => {
  const { question } = req.body;
  try {
   const doubt = new Doubt({
  question,
  askedBy: req.user.userId,
});
await doubt.save();

const populatedDoubt = await Doubt.findById(doubt._id)
  .populate("askedBy", "email")
  .populate("replies.repliedBy", "email");
    
    sendNotification("Doubt submitted", question, doubt._id, req.user);
    res.status(201).json(populatedDoubt);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: "Failed to submit doubt" });
  }
});

// Post a reply to a specific doubt
router.post("/:id/reply", verifyJwt, async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  try {
    const updated = await Doubt.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          replies: {
            message,
            repliedBy: req.user.id,
            timestamp: new Date(),
          },
        },
      },
      { new: true }
    )
      .populate("askedBy", "email")
      .populate("replies.repliedBy", "email");
      sendNotification("Reply to doubt", message, req.params.id, req.user);
    res.status(200).json(updated);
  } catch (err) {
    console.error("Reply failed:", err);
    res.status(500).json({ error: err.message || "Failed to add reply" });
  }
});

module.exports = router;
