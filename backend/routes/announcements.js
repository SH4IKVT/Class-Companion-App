const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const verifyJwt = require('../middleware/verifyJwt');
const sendNotification = require('../lib/sendNotification');

// GET /announcements/all
router.get('/all', verifyJwt, async (req, res) => {
  try {
    const list = await Announcement.find()
      .sort({ date: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /announcements/upload
router.post('/upload', verifyJwt, async (req, res) => {
  if (req.user.type !== 'teacher') {
    return res.status(403).json({ message: 'Only teachers can post announcements.' });
  }

  const { title, content, deadline } = req.body;
  if (!title || !content || !deadline) {
    return res.status(400).json({ message: 'Title, content and deadline are required.' });
  }

  try {
    const ann = await Announcement.create({ title, content, deadline });
   sendNotification("Announcement", `New announcement: ${title}`, ann._id, req.user);
    res.status(201).json(ann);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create announcement.' });
  }
});

// DELETE /announcements/:id
router.delete('/:id', verifyJwt, async (req, res) => {
  if (req.user.type !== 'teacher') {
    return res.status(403).json({ message: 'Only teachers can delete announcements.' });
  }

  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Announcement not found.' });
    }
    res.json({ message: 'Announcement deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete announcement.' });
  }
});

module.exports = router;
