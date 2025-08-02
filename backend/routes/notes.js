const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/verifyJwt");
const { uploadNotes } = require("../middleware/uploadNotes");

const { postNote, getNotes } = require("../controllers/notesController");

router.post("/upload", verifyJwt, uploadNotes.single("file"), postNote);
router.get("/all",    verifyJwt, getNotes);

module.exports = router;
