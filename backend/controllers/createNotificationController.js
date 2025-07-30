const Notification = require('../models/notification');

const createNotification=async(req,res)=>{
    const {type, message}=req.body;
    if(!type || !message){
        return res.status(400).json({success:false,message:'All fields are required'});
    }
    try{
        const notification = new Notification({
            type,
            message
        });
        await notification.save();
        res.status(200).json({success:true,message:'Notification created successfully'});
    }catch(err){
        console.error(err);
        return res.status(500).json({success:false,message:'Internal Server error'});
    }
    
}
module.exports = createNotification
