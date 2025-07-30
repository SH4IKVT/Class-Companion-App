const notificationRouter = require('express').Router();
const getNotifications = require('../controllers/getNotificationController');
const createNotifications = require('../controllers/createNotificationController');

notificationRouter.get('/', getNotifications);
notificationRouter.post('/', createNotifications);
module.exports = notificationRouter;