const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/verifyJwt");
const { uploadAssignments } = require("../middleware/uploadAssignments");
const { postAssignment, getAssignments } = require("../controllers/assignmentsController");

router.post("/upload", verifyJwt, uploadAssignments.single("file"), postAssignment);
router.get("/all", verifyJwt, getAssignments);

module.exports = router;
