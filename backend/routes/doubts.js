// const express = require("express");
// const router = express.Router();
// const Doubt = require("../models/Doubt");

// // Get all doubts
// router.get("/", async (req, res) => {
//   try {
//     const doubts = await Doubt.find().sort({ createdAt: -1 });
//     res.json(doubts);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch doubts" });
//   }
// });

// // Post a new doubt
// router.post("/", async (req, res) => {
//   const { question, askedBy } = req.body;
//   try {
//     const doubt = new Doubt({ question, askedBy });
//     await doubt.save();
//     res.json(doubt);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to submit doubt" });
//   }
// });

// // Add a reply to a doubt
// router.put("/:id", async (req, res) => {
//   const { reply, answeredBy } = req.body;
//   try {
//     const updated = await Doubt.findByIdAndUpdate(
//       req.params.id,
//       { reply, answeredBy },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update reply" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Doubt = require("../models/Doubt");
const verifyJwt = require("../middleware/verifyJwt"); 

router.get("/my", verifyJwt, async (req, res) => {
  try {
    const doubts = await Doubt.find({ askedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your doubts" });
  }
});

router.get("/", verifyJwt, async (req, res) => {
  try {
    const doubts = await Doubt.find().sort({ createdAt: -1 }).populate("askedBy", "email");
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doubts" });
  }
});

router.post("/", verifyJwt, async (req, res) => {
  const { question } = req.body;

  try {
    const doubt = new Doubt({
      question,
      askedBy: req.user.id
    });
    await doubt.save();
    res.status(201).json(doubt);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit doubt" });
  }
});

router.put("/:id", verifyJwt, async (req, res) => {
  const { reply, answeredBy } = req.body;

  try {
    const updated = await Doubt.findByIdAndUpdate(
      req.params.id,
      { reply, answeredBy },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update reply" });
  }
});

module.exports = router;
