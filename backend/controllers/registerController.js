const User=require('../models/user');
const bcrypt=require('bcryptjs');

registerUser=async (req,res)=>{
    const {username,email,password}=req.body;

    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({success:false,message:'the email already exists'});
        }
        const  hashedpassword=await bcrypt.hash(password,10);

        user=new User({
            username,
            email,
            password:hashedpassword
        });

        await user.save();
        console.log('user saved successfully');
        res.json({
            success:true,
            message:'registration in successful',
            user:{username:user.username,email:user.email}
        },console.log('register done'));
    }catch(err){
        console.error(err);
        return res.status(500).json({success:false,message:'Internal Server error'});
    }
}
module.exports=registerUser;