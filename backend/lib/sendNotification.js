const WebSocket = require('ws');
const Notification = require("../models/notification");
const WsStore = require("./wsStore");

const sendNotification = async(type, message,postId="", currentUser) => {
    const wss = WsStore.get();
    let notification
    if ( !type || !message) {
        return false; 
    }
    try {
        notification = await Notification.create({ type, message, postId });
        
        notification = {
            _id: notification._id,
            type: notification.type,
            message: notification.message.slice(0, 50)+" ...",
            postId: notification.postId,
            createdAt: notification.createdAt
        };
    
    } catch (error) {
        console.log(error);
        
        return false
    }
    if(!notification){
        return false
    }
    
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.email !== currentUser?.email) {
            client.send(JSON.stringify({ ...notification, isRead: false }));
            
        }
    });
};

module.exports = sendNotification