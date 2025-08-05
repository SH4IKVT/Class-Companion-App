const notificationRouter = require('express').Router();
const getNotifications = require('../controllers/getNotificationController');
const createNotifications = require('../controllers/createNotificationController');
const checkToken=require('../middleware/verifyJwt');
notificationRouter.get('/',checkToken, getNotifications);
notificationRouter.post('/',checkToken ,createNotifications);
module.exports = notificationRouter;
