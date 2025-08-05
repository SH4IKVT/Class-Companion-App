const Notification = require('../models/notification');

const getNotifications = async(req,res)=>{
    const action = req.query.action;
    const notificationId = req.query.notificationId;
    if (action === 'markAsRead'&& notificationId) {
        try {
            const notification = await Notification.findById(notificationId);
            if (!notification) {
                res.status(404).json({ message: 'Notification not found' });
                return
            }
            
            if (notification.readBy.includes(req.user.userId)) {
                res.status(200).json({ message: 'Notification already marked as read' });
                return
            }
             notification.readBy.push(req.user.userId);
                await notification.save();
                res.status(200).json({ message: 'Notification marked as read' });
                return
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
            return
        }
    }
    try {
        let notifications = await Notification.find().sort({ createdAt: -1 });
        let bellCount = 0;
        notifications = notifications.map((notification) => {
            if (!notification.readBy.includes(req.user.userId)) {
                bellCount++;                
            }
            return {
                _id: notification._id,
                type: notification.type,
                message: notification.message.slice(0, 50)+" ...",
                postId: notification.postId,
                createdAt: notification.createdAt,
                isRead: notification.readBy.includes(req.user.userId)
            };
        })
        
        res.status(200).json({notifications, bellCount, success:true, message:'Notifications fetched successfully'});
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return
    }
}
module.exports=getNotifications;