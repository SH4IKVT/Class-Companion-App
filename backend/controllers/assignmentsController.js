// const Assignment = require("../models/Assignment");

// // Teacher only: post assignment
// exports.postAssignment = async (req, res) => {
//   if (req.user.type !== "teacher") {
//     return res.status(403).json({ error: "Only teachers can post assignments" });
//   }

//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     const { title, subject, dueDate } = req.body;
//     const fileUrl = `${req.protocol}://${req.get("host")}/uploads/assignments/${req.file.filename}`;


//     const assignment = await Assignment.create({
//       title,
//       subject,
//       dueDate,
//       fileUrl,
//       uploader: {
//         id:   req.user.userId,
//         name: req.user.username,
//         role: req.user.type
//       }
//     });

//     res.status(201).json(assignment);
//   } catch (err) {
//     console.error("Assignment upload error:", err);
//     res.status(500).json({ error: "Failed to upload assignment" });
//   }
// };

// // Both roles: get list
// exports.getAssignments = async (req, res) => {
//   try {
//     const assignments = await Assignment
//       .find()
//       .sort({ createdAt: -1 });
//     res.status(200).json(assignments);
//   } catch (err) {
//     console.error("Fetch assignments error:", err);
//     res.status(500).json({ error: "Could not fetch assignments" });
//   }
// };





const Assignment = require("../models/Assignment");

// 🧑‍🏫 Teacher only: post assignment
exports.postAssignment = async (req, res) => {
  if (req.user.type !== "teacher") {
    return res.status(403).json({ error: "Only teachers can post assignments" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const { title, subject, dueDate } = req.body;

    //  Absolute URL for static file access
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/assignments/${req.file.filename}`;

    const assignment = await Assignment.create({
      title,
      subject,
      dueDate,
      fileUrl,
      uploader: {
        id: req.user.userId,
        name: req.user.username,
        role: req.user.type,
      },
    });

    res.status(201).json(assignment);
  } catch (err) {
    console.error("Assignment upload error:", err);
    res.status(500).json({ error: "Failed to upload assignment" });
  }
};

//  Both roles: fetch assignment list
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (err) {
    console.error("Fetch assignments error:", err);
    res.status(500).json({ error: "Could not fetch assignments" });
  }
};
