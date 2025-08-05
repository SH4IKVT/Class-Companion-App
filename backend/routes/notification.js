const notificationRouter = require('express').Router();
const getNotifications = require('../controllers/getNotificationController');
const createNotifications = require('../controllers/createNotificationController');
const verifyJwt=require('../middleware/verifyjwt');
notificationRouter.get('/',verifyJwt(req,res)=>{
  
}, getNotifications);
notificationRouter.post('/', createNotifications);
module.exports = notificationRouter;
