const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter username and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'user cant be found!' });
        }
       
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }


        //creating jwt token
        const token = jwt.sign({ userId: user._id, username: user.username, email: user.email, type: user.type }, process.env.JWT_KEY||'123', {
            expiresIn: '3h',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3 * 60 * 60 * 1000
        });
        res.status(200).json(
            {
                success: true,
                message: 'Login Successful',
                user: { username: user.username, email: user.email, type: user.type }
            });
    } catch (err) {
        return res.status(500)({ success: false, message: 'Server error' });
    }
};