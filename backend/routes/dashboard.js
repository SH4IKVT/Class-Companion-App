const Announcement = require('../models/Announcement');
const Assignment = require('../models/Assignment');
const Doubt = require('../models/Doubt');
const Note = require('../models/Note');

const express = require("express");
const router = express.Router();
router.get('/', async(req, res) => {
    if(req.user.type === 'student') {
        const dashboardData = await Promise.all([
            Assignment.find(),
            Doubt.find({ askedBy: req.user.userId }),
            Note.find(),
            Announcement.find(),
        ])

       res.status(200).json({dashboard:[{title: "Assignments", count: dashboardData[0].length},
            {title: "Doubts", count: dashboardData[1].length},
            {title: "Notes", count: dashboardData[2].length},
            {title: "Announcements", count: dashboardData[3].length},]})
    }
    if(req.user.type === 'teacher') {
        const dashboardData = await Promise.all([
            Assignment.find(),
            Doubt.find(),
            Note.find(),
            Announcement.find(),
        ])

        return res.status(200).json({dashboard:[{title: "Assignments", count: dashboardData[0].length},
            {title: "Doubts", count: dashboardData[1].length},
            {title: "Notes", count: dashboardData[2].length},
            {title: "Announcements", count: dashboardData[3].length},]})
    }
    return res.status(200).json({
        assignments: [],
        doubts: [],
        notes: [],
        announcements: [],
    })
})

module.exports = router