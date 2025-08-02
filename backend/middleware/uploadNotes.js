const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure folder exists
const dir = "uploads/notes/";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: dir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `note-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (_, file, cb) => {
 const ext = path.extname(file.originalname).toLowerCase();
   const allowed = [".pdf", ".doc", ".docx"];
  allowed.includes(ext) ? cb(null, true) : cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
};

const uploadNotes = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

module.exports = { uploadNotes };
