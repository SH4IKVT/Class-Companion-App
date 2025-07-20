const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

registerUser=async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({success:false,message:'All fields are required'});
    }
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({success:false,message:'the email already exists'});
        }
        user = await User.findOne({username});
        if(user){
            return res.status(400).json({success:false,message:'The username already exists'});
        }
        const  hashedpassword=await bcrypt.hash(password,10);

        user=new User({
            username,
            email,
            password:hashedpassword,
            type:'student'
        });

        await user.save();
        const token = jwt.sign({ userId: user._id, username: user.username, email: user.email, type: user.type }, process.env.JWT_KEY||'123', {
            expiresIn: '3h',
        })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3 * 60 * 60 * 1000
        });
        res.status(200).json({
            success:true,
            message:'registration in successful',
            user:{username:user.username,email:user.email}
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({success:false,message:'Internal Server error'});
    }
}
module.exports=registerUser;