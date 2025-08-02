const Note = require("../models/Note");

exports.postNote = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const { title, subject, tags } = req.body;
    const ext = req.file.mimetype.split("/")[1]; // e.g. 'pdf' or 'msword'/'vnd.openxmlformats-officedocument.wordprocessingml.document'
    const fileType = ext.includes("word") ? 
      req.file.originalname.split(".").pop().toLowerCase() : 
      ext;

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/notes/${req.file.filename}`;


    const note = await Note.create({
      title,
      subject,
      fileUrl,
      uploader: {
        id:   req.user.userId,
        name: req.user.username,
        role: req.user.type
      }
    });

    res.status(201).json(note);
  } catch (err) {
    console.error("Note upload error:", err);
    res.status(500).json({ error: "Failed to upload note" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note
      .find()
      .sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Fetch notes error:", err);
    res.status(500).json({ error: "Could not fetch notes" });
  }
};









